<template>
  <div class="app-container">
    <fieldset>
      <legend>操作</legend>
      <el-form :inline="true" :model="tQueryData" class="demo-form-inline">
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="onSaveDialogShow()">上传视频</el-button>
         温馨提示：视频资源由系统自动更新发布，无须人工管理。同时支持自己上传发布，可以丰富你的APP内容。
        </el-form-item>
      </el-form>
    </fieldset>
    <el-table :data="tableData.content" v-loading="tableLoading" border style="width: 100%" size="mini">
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column label="时长" align="center">
        <template slot-scope="scope">
          {{timeStamp(scope.row.time) }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="a2Id" label="在A2的主键" align="center">
      </el-table-column> -->
      <el-table-column prop="tags" label="标签" align="center">
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">
          {{tg(scope.row.pubtime)}}
        </template>
      </el-table-column>
     <el-table-column prop="pv" label="虚拟播放量" align="center">
      </el-table-column>
      <el-table-column prop="pv2" label="实际播放量" align="center">
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
      </el-table-column>
      <!-- <el-table-column prop="srctype" label="来源" align="center">
      </el-table-column> -->
      <el-table-column label="操作">
      </el-table-column>
    </el-table>

    <div class="p">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="prev, pager, next"
        :total="tableData.totalElements">
      </el-pagination>
    </div>

    <!-- 添加 -->
    <el-dialog title="新增" width="30%" :visible.sync="tDialogSaveVisible">
      <el-form :model="tUpdateData" size="small">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="tUpdateData.title" auto-complete="off"></el-input>
        </el-form-item>       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tDialogSaveVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSaveSubmit" :loading="tLoadingUpdateConfirm">确 定</el-button>
      </div>
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
        query(this.tQueryData).then(response => {
          this.tableData = response.data
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      },
      onSaveSubmit() {
        this.tLoadingUpdateConfirm = true
        update(this.tUpdateData).then(response => {
          this.tLoadingUpdateConfirm = false
          this.tDialogSaveVisible = false
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        }).catch(() => {
          this.tLoadingUpdateConfirm = false
        })
      },
      onUpdateSubmit() {
        this.tLoadingUpdateConfirm = true
        update(this.tUpdateData).then(response => {
          this.tLoadingUpdateConfirm = false
          this.tDialogUpdateVisible = false
          this.$set(this.tableData.content, this.tUpdateRowIndex, this.tUpdateData)
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }).catch(() => {
          this.tLoadingUpdateConfirm = false
        })
      },
      onDelete(scope) {
        // this.tableData.content.splice(scope.$index, 1)
        this.$confirm('删除uuid为 ' + scope.row.uuid + ' 的记录？此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              del({
                uuid: scope.row.uuid
              }).then(response => {
                done()
                instance.confirmButtonLoading = false
                this.tableData.content.splice(scope.$index, 1)
                this.tableData.totalElements -= 1
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
      // this.fetchData()
    },
    filter: {
      formatStutus(val) {
        console.log(val)
      }
    },
    data() {
      return {
        tLoadingUpdateConfirm: false,
        tDialogSaveVisible: false,
        tDialogUpdateVisible: false,
        tableLoading: false,
        tQueryData: {},
        tUpdateData: {},
        tUpdateRowIndex: 0,
        formLabelWidth: '120px',
        tableData: []
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

</style>
