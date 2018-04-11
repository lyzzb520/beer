<template>
  <div class="app-container">
    <fieldset>
      <legend>操作</legend>

      <el-form :inline="true" :model="tQueryData" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input size="mini" style="width:130px;" v-model="tQueryData.username" placeholder="输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="IP">
          <el-input size="mini" style="width:130px;" v-model="tQueryData.regip" placeholder="输入IP" clearable></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.regtime[0]" type="datetime" placeholder="选择开始日期时间">
          </el-date-picker> -
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.regtime[1]" type="datetime" placeholder="选择结束日期时间">
          </el-date-picker>
          <!-- <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.regtime" type="datetimerange" :picker-options="pickerOptions2"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker> -->
        </el-form-item>
        <el-form-item label="会员类型">
          <el-select class="query-sort" size="mini" v-model="tQueryData.type">
            <el-option label="全部" value="null"></el-option>
            <el-option label="普通会员" value="0"></el-option>
            <el-option label="VIP会员" value="1"></el-option>
          </el-select>
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
      <el-table-column type="index" width="50" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="150" align="center">
      </el-table-column>
      <el-table-column label="注册时间/IP" align="center">
        <template slot-scope="scope">
          {{tg(scope.row.regtime)}}/{{scope.row.regip}}
        </template>
      </el-table-column>
      <el-table-column label="最后登录时间/IP" align="center">
        <template slot-scope="scope">
          {{tg(scope.row.logintime)}}/{{scope.row.loginip}}
        </template>
      </el-table-column>
      <el-table-column prop="endtime" label="VIP截止日期" align="center">
        <template slot-scope="scope">
          {{scope.row.endtime}}
          <span class="svg-container" @click="modifyEndtime(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="endtime" label="类型" align="center">
        <template slot-scope="scope">
          {{viptypes[scope.row.viptype]}}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱/手机号" align="center">
        <template slot-scope="scope">
          {{scope.row.email}}
          <span class="svg-container" @click="modifyEmail(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
          / {{scope.row.phone}}
          <span class="svg-container" @click="modifyPhone(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
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
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="modifyPwd(scope)" type="primary" size="mini">重置登录密码</el-button>
          <el-button @click="modifyGesture(scope)" type="primary" size="mini" style="margin-left:0px;">重置手势密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="p">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tQueryData.page"
        :page-sizes="[10, 20, 30, 50, 100, 200, 300, 400]" :page-size="tQueryData.size" layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.totalElements">
      </el-pagination>


      <el-dialog title="请选择会员截止时间" :visible.sync="dialogVisibleEndtime" width="35%">
• 截止日期为空或在当前时间之前，则此刻视为普通会员<br>
• 截止日期不为空且在当前时间之后，则此刻视为VIP会员<br>
• 通常用户充值支付成功后，系统自动更新VIP截止日期，<br>
若未自动更新需手工修改时应注意：<br>
    &nbsp;&nbsp;&nbsp;&nbsp;• 截止日期为空或在当前时间之前，从当前时间开始顺延<br>
    &nbsp;&nbsp;&nbsp;&nbsp;• 截止日期不为空且在当前时间之后，从截止时间开始顺延<br>
        <div class="block">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="endTime" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleEndtime = false">取 消</el-button>
          <el-button type="primary" :loading="updateEndtimeLoading" @click="updateEndtime">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="重置密码" :visible.sync="dialogVisiblePwd" width="30%">
        <el-form :model="rulePwd" :rules="rulesPwd" ref="rulePwd" label-width="100px" class="demo-ruleForm">
          <el-form-item label="输入密码" prop="pass">
            <el-input type="text" v-model="rulePwd.pass" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="text" v-model="rulePwd.checkPass" auto-complete="off" clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm">取 消</el-button>
          <el-button type="primary" :loading="updatePwdLoading" @click="updatePwd('rulePwd')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    query,
    update
  } from '@/api/user'
  import timeago from 'timeago.js'
  export default {
    methods: {
      tg(time) {
        if (time) {
          return timeago(null, 'zh_CN').format(time)
        }
      },
      updateEndtime() {
        this.updateEndtimeLoading = true
        update({
          username: this.endTimeScope.row.username,
          endtime: this.endTime
        }).then(response => {
          this.updateEndtimeLoading = false
          this.endTimeScope.row.endtime = this.endTime
          this.dialogVisibleEndtime = false
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        }).catch(() => {
          this.updateEndtimeLoading = false
        })
      },
      initQueryData() {
        this.tQueryData = {
          sort: '1',
          sortfiled: 'regtime',
          page: 1,
          size: 10,
          username: '',
          regip: '',
          type: 'null',
          regtime: []
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
      modifyPwd(scope) {
        // 重置密码
        this.username4pwd = scope
        this.dialogVisiblePwd = true
      },
      updatePwd(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false
          }
          this.updatePwdLoading = true
          update({
            username: this.username4pwd.row.username,
            pwd: this.rulePwd.pass
          }).then(r => {
            this.updatePwdLoading = false
            this.dialogVisiblePwd = false
            this.username4pwd.row.pwd = this.rulePwd.pass
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
          }).catch(() => {
            this.updatePwdLoading = false
          })
        })
      },
      resetForm() {
        this.rulePwd.pass = ''
        this.rulePwd.checkPass = ''
        this.dialogVisiblePwd = false
        this.$refs['rulePwd'].resetFields()
      },
      modifyGesture(scope) {
        this.$prompt('修改手势密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.gesture,
          lockScroll: false,
          inputPlaceholder: '请输入手势密码',
          inputPattern: /^\d{4,9}$/,
          inputErrorMessage: '请输入4~9位手势密码'
        }).then(({
          value
        }) => {
          update({
            username: scope.row.username,
            gesture: value
          }).then(response => {
            scope.row.gesture = value
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
      modifyEmail(scope) {
        this.$prompt('修改邮箱（请勿随意修改，用户可凭账号+邮箱找回密码）', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.email,
          lockScroll: false,
          inputPlaceholder: '请输入邮箱',
          inputPattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
          inputErrorMessage: '请输入合法的邮箱'
        }).then(({
          value
        }) => {
          update({
            username: scope.row.username,
            email: value
          }).then(response => {
            scope.row.email = value
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
      modifyPhone(scope) {
        this.$prompt('修改手机号（请勿随意修改，用户可凭账号+手机号找回密码）', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.phone,
          lockScroll: false,
          inputPlaceholder: '请输入手机号',
          inputPattern: /^[1][3,4,5,7,8][0-9]{9}$/,
          inputErrorMessage: '请输入合法的手机号'
        }).then(({
          value
        }) => {
          update({
            username: scope.row.username,
            phone: value
          }).then(response => {
            scope.row.phone = value
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
      modifyRemark(scope) {
        this.$prompt('修改备注', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.remark,
          lockScroll: false,
          inputPlaceholder: '请输入备注'
        }).then(({
          value
        }) => {
          update({
            username: scope.row.username,
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
      modifyEndtime(scope) {
        this.endTimeScope = scope
        this.endTime = scope.row.endtime
        this.dialogVisibleEndtime = true
      }
    },

    created() {
      this.initQueryData()
      this.fetchData()
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        }
        if (value.length < 6 || value.length > 9) {
          callback(new Error('密码只能是6~12位'))
        }
        callback()
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        }
        if (value !== this.rulePwd.pass) {
          callback(new Error('两次输入密码不一致!'))
        }
        callback()
      }
      return {
        viptypes: ['普通会员', 'VIP会员'],
        username4pwd: null,
        rulePwd: {
          pass: '',
          checkPass: ''
        },
        rulesPwd: {
          pass: [{
            validator: validatePass,
            trigger: 'change'
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'change'
          }]
        },
        endTimeScope: null,
        updateEndtimeLoading: false,
        updatePwdLoading: false,
        endTime: '',
        dialogVisiblePwd: false,
        dialogVisibleEndtime: false,
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
    width: 100px;
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

</style>
