<template>
  <div class="app-container">
    <fieldset>
      <legend>操作</legend>

      <el-form :inline="true" :model="tQueryData" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input class="query-input" size="mini" v-model="tQueryData.orderno" placeholder="输入订单号" clearable></el-input>
        </el-form-item>
        <el-form-item label="充值账号">
          <el-input class="query-input" size="mini" v-model="tQueryData.username" placeholder="输入充值用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="套餐类型">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.goodstype">
            <el-option label="包月" value="0"></el-option>
            <el-option label="季度" value="1"></el-option>
            <el-option label="半年" value="2"></el-option>
            <el-option label="全年" value="3"></el-option>
            <el-option label="全部" value="null"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.paystatus">
            <el-option label="未支付" value="0"></el-option>
            <el-option label="支付成功" value="1"></el-option>
            <el-option label="支付失败" value="2"></el-option>
            <el-option label="全部" value="null"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第三方交易号">
          <el-input size="mini" style="width:130px;" v-model="tQueryData.tradeno" placeholder="输入第三方交易号" clearable></el-input>
        </el-form-item>
        <el-form-item label="更新VIP有效期">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.operstatus">
            <el-option label="全部" value="null"></el-option>
            <el-option label="已更新" value="1"></el-option>
            <el-option label="未更新" value="0"></el-option>
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
      <el-table-column fixed prop="orderno" label="订单号" width="150" align="center">
      </el-table-column>
      <el-table-column prop="username" label="充值账号" align="center">
      </el-table-column>  
      <el-table-column prop="goodstype" label="套餐类型" align="center">
        <template slot-scope="scope">
          {{goodsType[scope.row.goodstype]}}
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="金额" align="center">
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" align="center">
        <template slot-scope="scope">
          {{tg(scope.row.createtime)}}<br>{{scope.row.createtime}}
        </template>
      </el-table-column>
      <el-table-column label="支付结果" align="center">
        <template slot-scope="scope">
          {{payStatus[scope.row.paystatus]}}
        </template>
      </el-table-column>
      <el-table-column prop="paytime" label="支付时间" align="center">
      </el-table-column>
      <el-table-column prop="tradeno" label="第三方交易号" align="center">
      </el-table-column>
      <el-table-column prop="operstatus" label="更新VIP有效期" align="center">
        <template slot-scope="scope" >
          <el-button v-if="scope.row.paystatus===1 && scope.row.operstatus === 0" size="mini" @click="noteOperstatus" plain>已支付未处理</el-button>
          <span v-if="scope.row.paystatus===1 && scope.row.operstatus===1">已累加有效期</span>
        </template>
      </el-table-column>
      <el-table-column prop="opertime" label="处理时间" align="center">
      </el-table-column>
    </el-table>

    <div class="p">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tQueryData.page"
        :page-sizes="[10, 20]" :page-size="tQueryData.size" layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.totalElements">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    query
  } from '@/api/order'
  import timeago from 'timeago.js'
  export default {
    methods: {
      noteOperstatus(scope) {
        this.$alert('该订单已支付成功，请人工检查并确认已叠加该会员的VIP截止日期？如未更新需进入“用户管理—用户信息”手动修改，之后在此点击确认标记！', '温馨提示', {
          confirmButtonText: '确定'
        })
      },
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
          orderno: '',
          username: '',
          goodstype: 'null',
          paystatus: 'null',
          tradeno: '',
          operstatus: 'null',
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
      }
    },
    created() {
      this.initQueryData()
      this.fetchData()
    },
    data() {
      return {
        goodsType: ['包月', '季度', '半年', '全年'],
        payStatus: ['未支付', '支付成功', '支付失败'],
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
