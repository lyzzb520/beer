<template>
  <div class="app-container">
    <fieldset>
      <legend>操作</legend>

      <el-form :inline="true" :model="tQueryData" class="demo-form-inline">
        
        <el-form-item label="用户名">
          <el-input class="query-input" size="mini" v-model="tQueryData.username" placeholder="输入充值用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="问题类型">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.type">
            <el-option label="帐号问题" value="0"></el-option>
            <el-option label="充值问题" value="1"></el-option>
            <el-option label="资源内容" value="2"></el-option>
            <el-option label="广告投放" value="3"></el-option>
            <el-option label="其他" value="4"></el-option>
            <el-option label="全部" value="null"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input class="query-input" size="mini" v-model="tQueryData.contact" placeholder="输入联系方式" clearable></el-input>
        </el-form-item>
        <el-form-item label="留言内容">
          <el-input class="query-input" size="mini" v-model="tQueryData.content" placeholder="输入留言内容" clearable></el-input>
        </el-form-item>
        <el-form-item label="留言IP">
          <el-input class="query-input" size="mini" v-model="tQueryData.content" placeholder="输入留言IP" clearable></el-input>
        </el-form-item>
        <el-form-item label="处理状态">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.status">
            <el-option label="未处理" value="0"></el-option>
            <el-option label="已处理" value="1"></el-option>
            <el-option label="全部" value="null"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="留言时间">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.createtime" type="datetimerange" :picker-options="pickerOptions2"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="onQuerySubmit(true)">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" plain @click="initQueryData()" icon="el-icon-refresh">清空</el-button>
        </el-form-item>
      </el-form>
    </fieldset>
    <el-table :data="tableData.content" v-loading="tableLoading" border style="width: 100%" size="mini">
      <el-table-column fixed prop="username" label="用户名" width="150">
      </el-table-column>
      <el-table-column label="问题类型">
        <template slot-scope="scope">
          {{Type[scope.row.type]}}
        </template>
      </el-table-column>
      <el-table-column prop="contact" label="联系方式">
      </el-table-column>
      <el-table-column prop="content" label="留言内容">
      </el-table-column>
      <el-table-column prop="ip" label="留言IP">
      </el-table-column>
      <el-table-column prop="status" label="处理状态">
        <template slot-scope="scope">
          {{Status[scope.row.status]}}
          <span class="svg-container" @click="modifyStatus(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
       <el-table-column prop="createtime" label="留言时间">
         <template slot-scope="scope">
          {{tg(scope.row.createtime)}}
        </template>
      </el-table-column>
    </el-table>

    <div class="p">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tQueryData.page"
        :page-sizes="[10, 20, 30, 50, 100, 200, 300, 400]" :page-size="tQueryData.size" layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.totalElements">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    query, update
  } from '@/api/feedback'
  import timeago from 'timeago.js'
  export default {
    methods: {
      tg(time) {
        if (time) {
          return timeago(null, 'zh_CN').format(time)
        }
      },
      initQueryData() {
        this.tQueryData = {
          sort: '1',
          sortfiled: 'createtime',
          page: 1,
          size: 10,
          username: '',
          type: 'null',
          contact: '',
          content: '',
          ip: '',
          status: 'null',
          createtime: []
        }
      },
      timest() {
        return Date.parse(new Date()).toString().substr(0, 10)
      },
      onQuerySubmit(first) {
        if (first) {
          this.tQueryData.page = 1
        }
        this.tableLoading = true
        query(this.tQueryData).then(response => {
          if (response.data !== null) {
            this.tableData = response.data
          } else {
            this.tableData = []
          }
  
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
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
        this.onQuerySubmit(true)
      },
      modifyStatus(scope) {
        const d = Math.abs(scope.row.status - 1)
        if (scope.row.status === 1) {
          // 改成未发布
          this.$confirm('确定下架标题为 ' + scope.row.username + ' 的记录？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                update({
                  id: scope.row.id,
                  status: d
                }).then(response => {
                  done()
                  instance.confirmButtonLoading = false
                  scope.row.status = d
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
              message: '已成功取消!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        } else {
          // 已处理
          this.$confirm('确定标记为已处理 ' + scope.row.username + ' 的记录？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                update({
                  id: scope.row.id,
                  status: d
                }).then(response => {
                  done()
                  instance.confirmButtonLoading = false
                  scope.row.status = d
                  scope.row.pubtime = response.data.pubtime
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
              message: '已成功发布!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        }
      }
    },
    created() {
      this.initQueryData()
      this.fetchData()
    },
    data() {
      return {
        Type: ['账号问题', '充值问题', '资源内容', '广告投放', '其他'],
        Status: ['未处理', '已处理'],
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

  .demo-form-inline .el-form-item {
    margin-bottom: 0px;
  }

  .el-button--mini,
  .el-button--mini.is-round {
    padding: 5px 10px;
  }

  .query-stauts {
    width: 100px;
  }
  .thum {
    width: 80px;
    height: 80px;
  }
  .iconsize {
    font-size: 14px;
    cursor: pointer;
  }
</style>
