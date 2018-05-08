<template>
  <div class="container">
    <fieldset>
      <legend>操作</legend>
      <div style="padding:0px 30px 0px 30px;display:inline-flex;">
        <div style="display: inline-flex;line-height: 2.6;">
          <div :style="ali==='1'?'color:blue':'color:gray'">支付宝收款{{ali==='1'?'(已启用)':'(未启用)'}}</div>
          <div @click="aliopen">
            <el-switch v-model="ali1" class="sw"></el-switch>
          </div>
        </div>

        <div style="display: inline-flex;line-height: 2.6;margin-left:50px;">
          <div :style="wx==='1'?'color:green':'color:gray'">微信收款{{wx==='1'?'(已启用)':'(未启用)'}}</div>
          <div @click="wxopen">
            <el-switch v-model="wx1" class="sw" active-color="#13ce66">
            </el-switch>
          </div>

        </div>

      </div>
    </fieldset>
    <el-form style="padding: 10px 20px 10px 20px;border: 1px solid #ebeef5;">
      <el-form-item label="个人收款PaysApi商户Uid：">
        <div>{{uid}}</div>
      </el-form-item>
      <el-form-item label="个人收款PaysApi商户Token：">
        <div>{{token}}</div>
      </el-form-item>
      <el-form-item label="订单有效时长：">
        <div>{{expired}}</div>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%;margin-top:10px;">
      <el-table-column prop="price" label="套餐类型 定价(元)" width="180" align="center">
      </el-table-column>
      <el-table-column prop="disprice" label="APP显示价格(元)" width="180" align="center">
      </el-table-column>
      <el-table-column label="需提供生成的支付宝/微信收款二维码金额" align="center">
        <template slot-scope="scope">
          <div v-html="scope.row.qrcode"></div>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding:10px;line-height:30px;">
      <strong>功能说明（必看）：</strong><br>
1.	由于目前市面上第三方支付商户品牌五花八门、成本高、不稳定、难维护等，因此本系统推荐采用个人收款方式；<br>
2.	个人收款顾名思义指利用个人支付宝/微信账户收款，适合小额支付（本系统只有四种小额的VIP充值），稳定无风控；<br>
3.	根据以上表格所示，在个人支付宝/微信上生成一批收款二维码，将所有二维码图片提供给管理员；<br>
4.	准备一台安卓手机，确保24小时通电且不掉线，打开支付宝/微信APP、和PaysApi监听到帐通知APP；<br>
5.	其原理是：假设半年VIP定价是100元，若同时有多个用户都要充值半年套餐，那么有的实际订单金额是100.00、有的是99.99、有的是100.01……最大上浮或下浮5毛钱（±50分钱=100个不同金额），因此提供的收款二维码金额越多则支持的并发量越高，其中标注红色金额的收款码必须生成提供；<br>
每笔订单在其有效期内实际金额是唯一的，即每个实际金额任一时刻最多只有一笔订单在使用，因此结合到帐通知能够精准匹配订单；<br>
6.	由于实际金额有下浮也有上浮，如定价是100元，实际金额99.50～100.49，但作为用户能够接受下浮、不能接受上浮（哪怕只有几分钱），因此APP显示价格为101元；<br>
7.	本系统已集成PaysApi个人收款接口服务，无需人工操作；月租29.99元手续费0.3%、月租59.99元手续费0.2%、月租99.99元手续费0.1%，所有费用均由个人收款接口服务商收取，本系统未抽取任何充值分成；<br>
8.	如需修改价格请前往“系统设置—基础设置—会员充值价格设置”修改后刷新本页面，同时联系管理员重新设置收款二维码；<br>
9. 若用户在订单有效期内未完成支付、而是在订单超时后继续支付，或者监听通知的APP未正常工作等特殊情况，将造成订单无法匹配，需人工检查后自行补工单；<br>
10.请勿擅自修改PaysApi信息；请勿向PaysApi透露个人收款用途，本系统已通过技术手段隐藏收款用途，否则被禁用后果自负！<br>
<br>
<strong>相关链接：</strong><br>
监听通知安卓APP下载 <a style="color:blue;" href="https://www.paysapi.com/appdownload">https://www.paysapi.com/appdownload</a><br>
手机权限设置 <a style="color:blue;" href="https://www.paysapi.com/app_miui">https://www.paysapi.com/app_miui</a><br>
常见问题 <a style="color:blue;" href="https://www.paysapi.com/faqindex">https://www.paysapi.com/faqindex</a><br>

    </div>
  </div>




</template>

<script>
  import {
    getSetting,
    setSetting
  } from '@/api/setting'
  export default {
    data() {
      return {
        ali1: false,
        wx1: false,
        ali: '0',
        wx: '0',
        uid: '未设置',
        token: '未设置',
        expired: '未设置',
        tableData: []
      }
    },
    watch: {
      wx(a, b) {
        this.wx1 = a === '1'
      },
      ali(a, b) {
        this.ali1 = a === '1'
      }
    },
    methods: {
      loadSetting() {
        getSetting().then(r => {
          if (r !== null && r.data !== null) {
            this.ali = r.data[0][0]
            this.wx = r.data[0][1]
            this.uid = r.data[0][2] === '' ? this.uid : r.data[0][2]
            this.token = r.data[0][2] === '' ? this.token : r.data[0][3]
            this.expired = r.data[0][2] === '' ? this.expired : r.data[0][4] + '（秒）'
            for (let i = 1; i < r.data.length; i++) {
              const price = r.data[i][0]
              const disprice = r.data[i][1]
              const qrcode = r.data[i][2]
              const obj = {
                'price': price,
                'disprice': disprice,
                'qrcode': qrcode
              }
              this.tableData.push(obj)
            }
          }
        })
      },
      aliopen() {
        /*
        if (this.uid === '未设置' || this.token === '未设置' || this.expired === '未设置') {
          this.$alert('无法启用支付宝设置，请设置好uid、token、过期时间后再来开启')
        }
        */
        this.ali1 = !this.ali1
        if (this.ali === '1') {
          // 关闭支付宝收款
          this.$confirm('确认停用个人支付宝收款功能？', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            setSetting({
              paytype: 1,
              onoff: 0
            }).then(r => {
              if (r.code === 0) {
                this.$message({
                  type: 'success',
                  message: '已关闭支付宝支付!'
                })
                this.ali = '0'
              } else {
                this.$message({
                  type: 'success',
                  message: r.msg
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作!'
            })
          })
        } else {
          this.$confirm('确认已经做好相关设置，并已准备好一台安卓手机开启支付宝APP和监听到帐通知的PaysApi APP', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            setSetting({
              paytype: 1,
              onoff: 1
            }).then(r => {
              if (r.code === 0) {
                this.$message({
                  type: 'success',
                  message: '已开启支付宝支付!'
                })
                this.ali = '1'
              } else {
                this.$message({
                  type: 'success',
                  message: r.msg
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作！'
            })
          })
        }
      },
      wxopen() {
        this.wx1 = !this.wx1
        /*
        if (this.uid === '未设置' || this.token === '未设置' || this.expired === '未设置') {
          this.$alert('无法启用支付宝设置，请设置好uid、token、过期时间后再来开启')
        }
        */

        if (this.wx === '1') {
          // 关闭微信收款
          this.$confirm('确认停用个人微信收款功能？', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            setSetting({
              paytype: 2,
              onoff: 0
            }).then(r => {
              if (r.code === 0) {
                this.$message({
                  type: 'success',
                  message: '已关闭微信支付!'
                })
                this.wx = '0'
              } else {
                this.$message({
                  type: 'success',
                  message: r.msg
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作!'
            })
          })
        } else {
          this.$confirm('确认已经做好相关设置，并已准备好一台安卓手机开启支微信APP和监听到帐通知的PaysApi APP', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            setSetting({
              paytype: 2,
              onoff: 1
            }).then(r => {
              if (r.code === 0) {
                this.$message({
                  type: 'success',
                  message: '已开启微信支付!'
                })
                this.wx = '1'
              } else {
                this.$message({
                  type: 'success',
                  message: r.msg
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作！'
            })
          })
        }
      }
    },
    mounted() {
      this.loadSetting()
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  hr {
    border: solid 0.5px #e7e5e5;
  }

  .sw {
    margin: 10px;
  }

  .el-form-item {
    margin-bottom: 0px;
  }

  fieldset {
    border: 1px solid #ebeef5;
    margin-bottom: 10px;
    padding: 0.1em 1.1em 0.525em;
  }

  .container {
    padding: 20px;
  }

</style>
