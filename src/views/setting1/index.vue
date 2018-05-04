<template>
  <div class="container">
    <fieldset>
      <legend>操作</legend>
      <div style="padding:0px 30px 0px 30px;display:inline-flex;">
        <div style="display: inline-flex;line-height: 2.6;">
          <div :style="ali==='1'?'color:blue':'color:gray'">支付宝支付{{ali==='1'?'(已启用)':'(未启用)'}}</div>
          <div @click="aliopen">
            <el-switch v-model="ali1" class="sw"></el-switch>
          </div>
        </div>

        <div style="display: inline-flex;line-height: 2.6;margin-left:50px;">
          <div :style="wx==='1'?'color:green':'color:gray'">微信支付{{wx==='1'?'(已启用)':'(未启用)'}}</div>
          <div @click="wxopen">
            <el-switch v-model="wx1" class="sw" active-color="#13ce66">
            </el-switch>
          </div>

        </div>

      </div>
    </fieldset>
    <el-form label-width="80px" style="padding: 10px 20px 10px 20px;border: 1px solid #ebeef5;">
      <el-form-item label="uid">
        <div>{{uid}}</div>
      </el-form-item>
      <el-form-item label="token">
        <div>{{token}}</div>
      </el-form-item>
      <el-form-item label="有效期">
        <div>{{expired}}</div>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%;margin-top:10px;">
      <el-table-column prop="price" label="定价" width="180" align="center">
      </el-table-column>
      <el-table-column prop="disprice" label="APP显示价格" width="180" align="center">
      </el-table-column>
      <el-table-column label="支付宝/微信 收款二维码" align="center">
        <template slot-scope="scope">
          <div v-html="scope.row.qrcode"></div>
        </template>
      </el-table-column>
    </el-table>
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
        } else {
          this.$confirm('启用前请确认uid、token、过期时间已经设置无误，否则将无法成功使用支付宝收款！', '提示', {
            confirmButtonText: '已设置好',
            cancelButtonText: '还未设置',
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
        } else {
          this.$confirm('启用前请确认uid、token、过期时间已经设置无误，否则将无法成功使用微信收款！', '提示', {
            confirmButtonText: '已设置好',
            cancelButtonText: '还未设置',
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
