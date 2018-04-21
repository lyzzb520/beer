<template>
  <div class="app-container">
    <fieldset>
      <legend>操作</legend>
      <el-form :inline="true" :model="tQueryData" class="demo-form-inline">
        <el-form-item>
          <a class="el-button el-button--primary el-button--mini" href="upload/index.html" target="_blank"><i class="el-icon-plus"></i> 上传视频</a>
          <!-- <el-button size="mini" type="primary" icon="el-icon-refresh" @click="onQuerySubmit(true)">刷新</el-button> -->
          <span style="color:red">温馨提示：视频资源由系统自动更新发布，无须人工管理。同时支持自己上传发布，可以丰富你的APP内容。</span>
        </el-form-item>
      </el-form>
    </fieldset>
    <el-table :data="tableData.data===null?[]:tableData.data" v-loading="tableLoading" border style="width: 100%" size="mini">
      <el-table-column prop="title" label="标题" align="center">
        <template slot-scope="scope">
          {{scope.row.title}}
          <span class="svg-container" v-if="scope.row.srctype===1" @click="modifyTitle(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="时长" align="center">
        <template slot-scope="scope">
          {{timeStamp(scope.row.time) }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="a2Id" label="在A2的主键" align="center">
      </el-table-column> -->
      <el-table-column prop="tags" label="标签" align="center">
        <template slot-scope="scope">
          <span :key="index" class="tags" v-for="(tag, index) in scope.row.tags"> {{tag}} </span>
          <span class="svg-container" v-if="scope.row.srctype===1" @click="modifyTags(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">
          {{tg(scope.row.pubtime)}}<br>{{scope.row.pubtime}} 
        </template>
      </el-table-column>
      <el-table-column prop="pv" label="虚拟播放量" align="center">
      </el-table-column>
      <el-table-column prop="pv2" label="实际播放量" align="center">
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <span :style="scope.row.type===0?'color:blue':'color:red'">{{types[scope.row.type]}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.srctype===1" @click="onDelete(scope)" type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="p">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="prev, pager, next"
        :total="parseInt(tableData.msg)" :page-size="20">
      </el-pagination>
    </div>
    <!-- 修改标签窗口 -->
    <el-dialog title="修改标签" width="30%" :visible.sync="tDialogTagVisible">
      <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm">
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
      <el-form :model="tUpdateTag" size="small" :rules="rulesruleTagForm" ref="ruleTagForm">
        <el-form-item prop="content">
          <el-input v-model="tUpdateTag.content" auto-complete="off" style="display:none;"></el-input>  
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tDialogTagVisible = false">取 消</el-button>
        <el-button type="primary" @click="onModifyTagsSubmit('ruleTagForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    query,
    del,
    update
  } from '@/api/video'
  import timeago from 'timeago.js'
  export default {
    methods: {
      reloadTagsUpdate() {
        let d = ''
        if (this.dynamicTags.length > 0) {
          this.dynamicTags.forEach(e => {
            d = d + e + ','
          })
          this.tUpdateTag.content = d.substring(0, d.length - 1)
        }
      },
      modifyTitle(scope) {
        this.$prompt('修改标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.title,
          lockScroll: false,
          inputPlaceholder: '请输入标题',
          inputType: 'text',
          inputValidator: function(v) {
            v = v || ''
            if (v.trim() === '') {
              return '标题不能为空！'
            }
            if (v.length > 32) {
              return '标题长度不能查过32个字符'
            }
            return true
          }
        }).then(({
          value
        }) => {
          update({
            uuid: scope.row.uuid,
            title: value
          }).then(response => {
            scope.row.title = value
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改标题'
          })
        })
      },
      onModifyTagsSubmit(fn) {
        this.$refs[fn].validate((valid) => {
          if (valid) {
            update({
              uuid: this.tUpdateRowUuid,
              tags: this.tUpdateTag.content
            }).then(r => {
              this.tDialogTagVisible = false
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.tableData.data[this.tUpdateRowIndex].tags = []
              this.dynamicTags.forEach(e => {
                this.tableData.data[this.tUpdateRowIndex].tags.push(e)
              })
            })
          }
        })
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        this.reloadTagsUpdate()
      },

      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm() {
        const inputValue = this.inputValue
        if (inputValue) {
          this.dynamicTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
        this.reloadTagsUpdate()
      },
      modifyTags(scope) {
        this.tDialogTagVisible = true
        this.tUpdateRowIndex = scope.$index
        this.tUpdateRowUuid = scope.row.uuid
        this.dynamicTags.length = 0
        if (scope.row.tags !== null) {
          scope.row.tags.forEach(element => {
            this.dynamicTags.push(element)
          })
          this.reloadTagsUpdate()
        }
      },
      tg(time) {
        if (time) {
          return timeago(null, 'zh_CN').format(time)
        }
      },
      uploadCustom(data) {

      },
      uploadonChange(file, fileList) {
        this.tUpdateData.title = file.name
      },
      onQuerySubmit(first) {
        if (first) {
          this.tQueryData.page = 1
        }
        this.tableLoading = true
        query(this.tQueryData).then(r => {
          if (r.data === null) {
            this.tableData = []
          } else {
            this.tableData = r
          }

          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      },
      onDelete(scope) {
        // this.tableData.content.splice(scope.$index, 1)
        this.$confirm('删除视频标题为【 ' + scope.row.title + '】 的记录？此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              del({
                uuid: scope.row.uuid,
                a2id: scope.row.a2id
              }).then(response => {
                done()
                instance.confirmButtonLoading = false
                this.tableData.data.splice(scope.$index, 1)
                // this.tableData.totalElements -= 1
              }).catch(() => {
                instance.confirmButtonLoading = false
              })
            } else {
              done()
            }
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleSizeChange(val) {
        this.tQueryData.size = val
        this.onQuerySubmit(true)
      },
      handleCurrentChange(val) {
        this.tQueryData.page = val
        this.onQuerySubmit()
      },
      fetchData() {
        this.onQuerySubmit()
      },
      timeStamp(second_time) {
        let h = 0
        let i = 0
        let s = parseInt(second_time)
        if (s > 60) {
          i = parseInt(s / 60)
          s = parseInt(s % 60)
          if (i > 60) {
            h = parseInt(i / 60)
            i = parseInt(i % 60)
          }
        }
        // 补零
        const zero = function(v) {
          return (v >> 0) < 10 ? '0' + v : v
        }
        return [zero(h), zero(i), zero(s)].join(':')
      }
    },
    created() {
      // this.initQueryData()
      this.fetchData()
    },
    filter: {
      formatStutus(val) {
        console.log(val)
      }
    },
    data() {
      const validateTags = (rule, v, callback) => {
        v = v || ''
        if (v === '') {
          callback()
        }
        if (v.length > 45) {
          callback(new Error('标签长度必须小于等于45位,请删除一些标签'))
        }
        callback()
      }
      return {
        tUpdateTag: {
          content: ''
        },
        tUpdateRowUuid: '',
        tDialogTagVisible: false,
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        types: ['免费', 'VIP'],
        tLoadingUpdateConfirm: false,
        tDialogSaveVisible: false,
        tDialogUpdateVisible: false,
        tableLoading: false,
        tQueryData: {
          page: 1
        },
        tUpdateData: {},
        tUpdateRowIndex: 0,
        formLabelWidth: '120px',
        tableData: [],
        rulesruleTagForm: {
          content: [
            {
              validator: validateTags, trigger: 'change'
            }]
        }
      }
    }
  }

</script>
<style scoped>
  .p {
    padding: 10px;
  }

  fieldset {
    border: 1px solid #ebeef5;
    margin-bottom: 10px;
    display: block;
    font-size: 12px;
    padding: 0.1em 1.1em 0.525em;
  }

  .query-sort {
    width: 60px;
  }

  .query-stauts {
    width: 85px;
  }

  .query-input {
    max-width: 120px;
  }

  .demo-form-inline .el-form-item {
    margin-bottom: 0px;
  }

  .el-button--mini,
  .el-button--mini.is-round {
    padding: 5px 10px;
  }

  .iconsize {
    font-size: 14px;
    cursor: pointer;
  }

  .tags {
    border: 1px solid;
    border-radius: 8px;
    padding: 0px 5px;
    margin: 2px;
    display: inline-block;
  }
.input-new-tag {
    width: 90px;
    margin: 5px 5px 0px 0px;
    vertical-align: bottom;
  }
   .el-tag {
    margin: 5px 5px 0px 0px;
  }
</style>
