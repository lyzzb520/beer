<template>
  <div class="app-container">
    <fieldset>
      <legend>操作</legend>

      <el-form :inline="true" :model="tQueryData" class="demo-form-inline">
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="onSaveDialogShow()">新增</el-button>
        </el-form-item>
        <el-form-item label="排序">
          <el-select class="query-sort" size="mini" v-model="tQueryData.sortfiled">
            <el-option label="uuid" value="uuid"></el-option>
            <el-option label="pt" value="pubtime"></el-option>
          </el-select>
          <el-select class="query-sort" size="mini" v-model="tQueryData.sort">
            <el-option label="升" value="0"></el-option>
            <el-option label="降" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input class="query-input" size="mini" v-model="tQueryData.title" placeholder="输入标题" clearable></el-input>
        </el-form-item>
        <el-form-item label="文学长度">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.totalcomparetype">
            <el-option label="大于" value="0"></el-option>
            <el-option label="小于" value="1"></el-option>
            <el-option label="全部" value="null"></el-option>
          </el-select>
          <el-input-number v-model="tQueryData.timecomparevalue" size="mini" :min="1" :max="50" style="width:100px;"></el-input-number>

        </el-form-item>
        <el-form-item label="前言">
          <el-input class="query-input" size="mini" v-model="tQueryData.preface" placeholder="输入前言" clearable></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input class="query-input" size="mini" v-model="tQueryData.tags" placeholder="输入标签" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.status">
            <el-option label="未发布" value="0"></el-option>
            <el-option label="已发布" value="1"></el-option>
            <el-option label="全部" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.timepubrange" type="datetimerange" :picker-options="pickerOptions2" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="onQuerySubmit(true)"></el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" plain @click="initQueryData()" icon="el-icon-refresh">清空</el-button>
        </el-form-item>
      </el-form>
    </fieldset>
    <el-table :data="tableData.content" v-loading="tableLoading" border style="width: 100%" size="mini">
      <el-table-column fixed prop="uuid" label="ID" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column prop="preface" label="前言" align="center">
      </el-table-column>
      <el-table-column prop="tags" label="标签" align="center">
      </el-table-column>
      <el-table-column prop="siteid" label="上传来源" align="center">
      </el-table-column>
      <el-table-column label="发布状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '0'?'info':'success'">{{ scope.row.status === '0'?'未发布' : '已发布' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="pubtime" label="发布时间" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click="onUpdateDialogShow(scope)" type="primary" size="mini" icon="el-icon-edit-outline"></el-button>
            <el-button @click="onDelete(scope)" type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <div class="p">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tQueryData.page"
        :page-sizes="[10, 20, 30, 50, 100, 200, 300, 400]" :page-size="tQueryData.size" layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.totalElements">
      </el-pagination>
    </div>

    <!-- 添加 -->
    <el-dialog title="新增" width="30%" :visible.sync="tDialogSaveVisible">
      <el-form :model="tUpdateData" size="small">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="tUpdateData.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="前言" :label-width="formLabelWidth">
          <el-input v-model="tUpdateData.preface" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-input v-model="tUpdateData.tags" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布来源" :label-width="formLabelWidth">
          <el-input v-model="tUpdateData.siteid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布状态" :label-width="formLabelWidth">
          <el-select class="query-stauts" size="mini" v-model="tUpdateData.status">
            <el-option label="未发布" value="0"></el-option>
            <el-option label="已发布" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-upload ref="upload" class="upload-demo" drag action="" :auto-upload="false" :http-request="uploadCustom" :before-upload="uploadonChange">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tDialogSaveVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSaveSubmit" :loading="tLoadingUpdateConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改" width="30%" :visible.sync="tDialogUpdateVisible">
      <el-form :model="tUpdateData" size="small">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="tUpdateData.uuid" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="tUpdateData.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="前言" :label-width="formLabelWidth">
          <el-input v-model="tUpdateData.preface" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-input v-model="tUpdateData.tags" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传来源" :label-width="formLabelWidth">
          <el-input v-model="tUpdateData.siteid" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="发布状态" :label-width="formLabelWidth">
          <el-select class="query-stauts" size="mini" v-model="tUpdateData.status">
            <el-option label="未发布" value="0"></el-option>
            <el-option label="已发布" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="formLabelWidth">
          <el-input v-model="tUpdateData.pubtime" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tDialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdateSubmit" :loading="tLoadingUpdateConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    query,
    del,
    update,
    upload
  } from '@/api/book'
  export default {
    methods: {
      uploadCustom(data) {
        // console.log(data)
        const formData = new FormData()
        formData.append('file', data.file)
        formData.append('abc', '123')
        upload(formData).then(response => {
          // 文件上传成功后提交数据
          // return true
        }).catch(() => {
          // return false
        })
      },
      uploadonChange(file, fileList) {
        this.tUpdateData.title = file.name
      },
      initQueryData() {
        this.tQueryData = {
          page: 1,
          size: 10,
          sort: '0',
          sortfiled: 'uuid',
          title: '',
          preface: '',
          tags: '',
          status: null,
          totalcomparetype: 'null',
          timepubrange: null
        }
      },
      initUpadateData() {
        this.tUpdateData = {
          uuid: null,
          title: '',
          preface: '',
          tags: '',
          siteid: '',
          status: '',
          pubtime: null
        }
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

      onUpdateDialogShow(scope) {
        this.initUpadateData()
        console.log(scope.row)
        this.tUpdateData.uuid = scope.row.uuid
        this.tUpdateData.title = scope.row.title
        this.tUpdateData.preface = scope.row.preface
        this.tUpdateData.tags = scope.row.tags
        this.tUpdateData.siteid = scope.row.siteid
        this.tUpdateData.status = scope.row.status
        this.tUpdateData.pubtime = scope.row.pubtime
        this.tUpdateRowIndex = scope.$index
        this.tDialogUpdateVisible = true
      },

      onSaveDialogShow() {
        this.initUpadateData()
        this.tDialogSaveVisible = true
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
        this.$confirm('删除id为 ' + scope.row.uuid + ' 的记录？此操作将永久删除该记录, 是否继续?', '提示', {
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
      }
    },
    created() {
      this.initQueryData()
      this.fetchData()
    },
    filter: {
      formatStutus(val) {
        console.log(val)
      }
    },
    data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        upload_url: 'https://www.baidu.com',
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
    width: 90px;
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
