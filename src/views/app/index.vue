<template>
  <div class="app-container">
    <fieldset>
      <div style="line-height:25px;padding:10px 5px; 1px 5px;font-size:15px;">
        <div style="color:red">温馨提示：统计所有访客使用APP记录，不论是否注册登录（包括会员和游客）。</div>
        <div style="color:red">搜索技巧：按首次打开时间可统计任意时间段APP安装情况，按最后打开时间可统计任意时间段APP活跃情况。</div>
      </div>
    </fieldset>
    <fieldset>
      <legend>操作</legend>

      <el-form :inline="true" :model="tQueryData" class="demo-form-inline" :rules="queryRules">
        
        <el-form-item label="查询时间类型">
            <el-select style="width:150px;" size="mini" v-model="tQueryData.timetype">
              <!-- <el-option label="全部" value="null"></el-option> -->
              <el-option label="首次打开时间" value="0"></el-option>
              <el-option label="最后打开时间" value="1"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item>
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.timerange[0]" type="datetime" placeholder="选择开始日期时间">
          </el-date-picker> -
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.timerange[1]" type="datetime" placeholder="选择结束日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="访客IP">
          <el-input size="mini" style="width:130px;" v-model="tQueryData.openip" placeholder="访客IP" clearable></el-input>
        </el-form-item>
        <el-form-item label="系统类型">
          <el-select class="query-sort" size="mini" v-model="tQueryData.ostype">
            <el-option label="全部" value="null"></el-option>
            <el-option label="安卓" value="0"></el-option>
            <el-option label="苹果" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-form-item label="手机品牌型号" prop="phonebrand">
            <el-input size="mini" style="width:180px;" v-model="tQueryData.phonebrand" placeholder="输入手机品牌型号" clearable></el-input>
          </el-form-item>
          
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
      <el-table-column prop="deviceid" label="设备号" width="150" align="center">
      </el-table-column>
      <el-table-column label="终端信息" align="center">
        <template slot-scope="scope">
          <span :style="scope.row.ostype===0?'color:green':'color:black'">{{ostypes[scope.row.ostype]}}</span>
          <br> {{scope.row.phonebrand}}
        </template>
      </el-table-column>
      <el-table-column prop="createtime" label="首次打开时间" align="center">
        <template slot-scope="scope">
          {{tg(scope.row.createtime)}}
          <br>{{scope.row.createtime}}
        </template>
      </el-table-column>
      <el-table-column prop="lasttime" label="最后打开时间" align="center">
        <template slot-scope="scope">
          {{tg(scope.row.lasttime)}}
          <br>{{scope.row.lasttime}}
        </template>
      </el-table-column>
      <el-table-column prop="total" label="打开次数" align="center">
      </el-table-column>
      <el-table-column prop="openip" label="访客IP" align="center">
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
    query
  } from '@/api/app'
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
          sortfiled: 'lasttime',
          page: 1,
          size: 10,
          openip: '',
          timerange: [],
          timetype: '0',
          ostype: 'null',
          phonebrand: ''
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
      resetForm() {
        this.rulePwd.pass = ''
        this.rulePwd.checkPass = ''
        this.dialogVisiblePwd = false
        this.$refs['rulePwd'].resetFields()
      }
    },

    created() {
      this.initQueryData()
      this.fetchData()
    },
    data() {
      var validate_phonebrand = (rule, value, callback) => {
        value = value || ''
        if (value.length > 45) {
          callback(new Error('不能超过45位字符!'))
        }
        callback()
      }
      return {
        ostypes: ['Android', 'IOS'],
        types: ['手动登录', '自动登录', '注册首次登录', '找回密码登录'],
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
        tableData: [],
        queryRules: {
          phonebrand: {
            validator: validate_phonebrand
          }
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
