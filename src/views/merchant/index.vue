<template>
  <div class="app-container">
    <fieldset>
      <legend>操作</legend>

      <el-form :inline="true" :model="tQueryData" class="demo-form-inline">
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="onSaveDialogShow()">新增</el-button>
        </el-form-item>
        <!-- <el-form-item label="排序" hidden>
          <el-select class="query-sort" size="mini" v-model="tQueryData.sortfiled">
            <el-option label="id" value="id"></el-option>
            <el-option label="ct" value="createtime"></el-option>
          </el-select>
          <el-select class="query-sort" size="mini" v-model="tQueryData.sort">
            <el-option label="升" value="0"></el-option>
            <el-option label="降" value="1"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="商户类型">
          <el-input size="mini" v-model="tQueryData.mtype" placeholder="商户类型" clearable></el-input>
        </el-form-item>
        <el-form-item label="支付类型">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.paytype">
            <el-option label="微信" value="1"></el-option>
            <el-option label="支付宝" value="2"></el-option>
            <el-option label="网银" value="3"></el-option>
            <el-option label="全部" value="null"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户号">
          <el-input size="mini" v-model="tQueryData.mcode" placeholder="商户号" clearable></el-input>
        </el-form-item>
        <el-form-item label="商户公司名称">
          <el-input size="mini" v-model="tQueryData.mname" placeholder="商户公司名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="支付回调域名">
          <el-input size="mini" v-model="tQueryData.domain" placeholder="支付回调域名" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.status">
            <el-option label="停用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="全部" value="null"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.createtime[0]" type="datetime" placeholder="选择开始日期时间">
          </el-date-picker> -
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.createtime[1]" type="datetime" placeholder="选择结束日期时间">
          </el-date-picker>
          <!-- <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.createtime" type="datetimerange" :picker-options="pickerOptions2"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker> -->
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
      <!-- <el-table-column fixed prop="mid" label="商户ID（自增）" width="150">
      </el-table-column> -->
      <el-table-column prop="mtype" label="第三方类型" align="center">
      </el-table-column>
      <el-table-column prop="paytype" label="支付类型" align="center">
        <template slot-scope="scope">
          {{ payType[scope.row.paytype-1] }}
        </template>
      </el-table-column>
      <el-table-column prop="mcode" label="商户号" align="center">
      </el-table-column>
      <el-table-column prop="mname" label="商户公司名称" align="center">
        <template slot-scope="scope">
          {{scope.row.mname}}
          <span class="svg-container" @click="modifyMname(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="支付回调域名" align="center">
        <template slot-scope="scope">
          {{scope.row.domain}}
          <span class="svg-container" @click="modifyDomain(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="keyt" label="密钥" align="center">
        <template slot-scope="scope">
          {{scope.row.keyt}}
          <span class="svg-container" @click="modifyKeyt(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="keyt2" label="密钥2" align="center">
        <template slot-scope="scope">
          {{scope.row.keyt2}}
          <span class="svg-container" @click="modifyKeyt2(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.status === 0?'info':'success'">{{ scope.row.status === 0?'停用' : '启用' }}</el-tag>
          <span class="svg-container" @click="modifyStatus(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span> -->
          <div @click="modifyStatus(scope)">
            <el-switch v-model=" scope.row.status === 1 " active-color="#13ce66" >
            </el-switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" align="center">
        <template slot-scope="scope">
          {{tg(scope.row.createtime)}}<br>{{scope.row.createtime}}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center">
        <template slot-scope="scope">
          {{scope.row.remark}}
          <span class="svg-container" @click="modifyRemark(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button-group>
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

    <!-- 新增 -->
    <el-dialog title="新增" width="40%" :visible.sync="tDialogSaveVisible">
      <el-form :model="tUpdateData" size="small" ref="newForm" :rules="rulesNewForm">
        <el-form-item label="第三方类型" :label-width="formLabelWidth" prop="mtype">
          <el-input v-model="tUpdateData.mtype" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付类型：" :label-width="formLabelWidth" prop="paytype">
          <el-select class="query-stauts" size="mini" v-model="tUpdateData.paytype">
            <el-option label="微信" value="1"></el-option>
            <el-option label="支付宝" value="2"></el-option>
            <el-option label="网银" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户号" :label-width="formLabelWidth" prop="mcode">
          <el-input v-model="tUpdateData.mcode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户公司名称" :label-width="formLabelWidth" prop="mname">
          <el-input v-model="tUpdateData.mname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付回调域名" :label-width="formLabelWidth" prop="domain">
          <el-input v-model="tUpdateData.domain" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密钥" :label-width="formLabelWidth" prop="keyt">
          <el-input v-model="tUpdateData.keyt" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密钥2" :label-width="formLabelWidth" prop="keyt2">
          <el-input v-model="tUpdateData.keyt2" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-select class="query-stauts" size="mini" v-model="tUpdateData.status">
            <el-option label="停用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="tUpdateData.remark" auto-complete="off"></el-input>
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
    update,
    add
  } from '@/api/merchant'
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
          mtype: '',
          paytype: 'null',
          mcode: '',
          mname: '',
          domain: '',
          status: 'null',
          createtime: []
  
        }
      },
      initUpadateData() {
        this.tUpdateData = {
          id: null,
          mtype: null,
          paytype: '1',
          mcode: null,
          mname: null,
          domain: null,
          keyt: null,
          keyt2: null,
          status: '0',
          createtime: null,
          remark: null
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
          this.tableData = response.data
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      },
      onSaveDialogShow() {
        this.initUpadateData()
        this.tDialogSaveVisible = true
      },
      onSaveSubmit() {
        this.tLoadingUpdateConfirm = true
        add(this.tUpdateData).then(response => {
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
        this.$confirm('删除id为 ' + scope.row.mid + ' 的记录？此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              del({
                mid: scope.row.mid
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
      modifyStatus(scope) {
        const d = Math.abs(scope.row.status - 1)
        if (scope.row.status === 1) {
          // 是否启用、停用商户
          this.$confirm('确定停用名称为 ' + scope.row.mname + ' 的商户？', '确定停用？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                update({
                  mid: scope.row.mid,
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
              message: '操作成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作！'
            })
          })
        } else {
          // 发布
          this.$confirm('确定启用名称为 ' + scope.row.mname + ' 的商户号？', '确定启用？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                update({
                  mid: scope.row.mid,
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
              message: '操作成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作！'
            })
          })
        }
      },
      modifyRemark(scope) {
        this.$prompt('修改备注', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.remark,
          lockScroll: false,
          inputPlaceholder: '请输入备注',
          inputPattern: /^[\S]+$/,
          inputErrorMessage: '备注不能为空'
        }).then(({
          value
        }) => {
          update({
            mid: scope.row.mid,
            remark: value
          }).then(response => {
            scope.row.remark = value
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作！'
          })
        })
      },
      modifyKeyt(scope) {
        this.$prompt('修改密钥1', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.keyt,
          lockScroll: false,
          inputPlaceholder: '请输入密钥1',
          inputPattern: /^[\S]+$/,
          inputErrorMessage: '密钥1不能为空'
        }).then(({
          value
        }) => {
          update({
            mid: scope.row.mid,
            keyt: value
          }).then(response => {
            scope.row.keyt = value
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作！'
          })
        })
      },
      modifyKeyt2(scope) {
        this.$prompt('修改密钥2', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.keyt2,
          lockScroll: false,
          inputPlaceholder: '请输入密钥2',
          inputPattern: /^[\S]+$/,
          inputErrorMessage: '密钥2不能为空'
        }).then(({
          value
        }) => {
          update({
            mid: scope.row.mid,
            keyt2: value
          }).then(response => {
            scope.row.keyt2 = value
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作！'
          })
        })
      },
      modifyDomain(scope) {
        this.$prompt('修改支付回调域名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.domain,
          lockScroll: false,
          inputPlaceholder: '请输入支付回调域名',
          inputPattern: /^[\S]+$/,
          inputErrorMessage: '支付回调域名不能为空'
        }).then(({
          value
        }) => {
          update({
            mid: scope.row.mid,
            domain: value
          }).then(response => {
            scope.row.domain = value
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作！'
          })
        })
      },
      modifyMname(scope) {
        this.$prompt('修改商户公司名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.mname,
          lockScroll: false,
          inputPlaceholder: '请输入商户公司名称',
          inputPattern: /^[\S]+$/,
          inputErrorMessage: '商户公司名称不能为空'
        }).then(({
          value
        }) => {
          update({
            mid: scope.row.mid,
            mname: value
          }).then(response => {
            scope.row.mname = value
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作！'
          })
        })
      }
    },
    created() {
      this.initQueryData()
      this.fetchData()
    },
    data() {
      return {
        rulesNewForm: {
          mtype: [],
          mcode: [],
          mname: [],
          domain: [],
          keyt: [],
          keyt2: [],
          remark: []
        },
        payType: ['微信', '支付宝', '网银'],
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
.iconsize {
    font-size: 14px;
    cursor: pointer;
  }
</style>
