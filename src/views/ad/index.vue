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
        <el-form-item label="类型">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.type">
            <el-option label="启动页" value="0"></el-option>
            <el-option label="首页轮播" value="1"></el-option>
            <el-option label="首页导航" value="2"></el-option>
            <el-option label="底部" value="3"></el-option>
            <el-option label="通用插播" value="4"></el-option>
            <el-option label="全部" value="null"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.status">
            <el-option label="未启用" value="0"></el-option>
            <el-option label="已启用" value="1"></el-option>
            <el-option label="全部" value="null"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input size="mini" style="width:130px;" v-model="tQueryData.title" placeholder="输入标题" clearable></el-input>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input size="mini" style="width:130px;" v-model="tQueryData.url" placeholder="输入链接地址" clearable></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.createtime" type="datetimerange" :picker-options="pickerOptions2"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
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
      <el-table-column fixed label="缩略图" align="center">
        <template slot-scope="scope">
          <img class="thum" :src="scope.row.thumurl">
        </template>
      </el-table-column>
      <!-- <el-table-column fixed prop="uuid" label="UUID" width="150">
      </el-table-column> -->
      <!-- <el-table-column prop="extname" label="图片文件扩展名">
      </el-table-column> -->
      <el-table-column label="广告类型" align="center">
        <template slot-scope="scope">
          {{adType[scope.row.type]}}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.status === 0?'info':'success'">{{ scope.row.status === 0?'未启用' : '已启用' }}</el-tag> -->
          <div @click="modifyStatus(scope)">
            <el-switch v-model=" scope.row.status === 1 " active-color="#13ce66" >
            </el-switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          {{scope.row.title}}
          <span class="svg-container" @click="modifyTitle(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="链接地址" align="center">
        <template slot-scope="scope">
          {{ /^(http|https):\/\/[\s\S]*[^/]$/.test(scope.row.url)? scope.row.url :(scope.row.url==='null'?'':linkObj.name[scope.row.url])
          }}
          <span class="svg-container" @click="modifyUrl(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="createtime" label="上传时间" align="center">
      </el-table-column>
      <el-table-column label="备注" align="center">
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
    <el-dialog title="新增" width="35%" :visible.sync="tDialogSaveVisible" :before-close="onBeforeClose">
      <el-form :model="tUpdateData" size="small" ref="newForm" :rules="rulesNewForm">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="tUpdateData.title" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select class="query-stauts" size="mini" v-model="tUpdateData.type">
            <el-option label="启动页" value="0"></el-option>
            <el-option label="首页轮播" value="1"></el-option>
            <el-option label="首页导航" value="2"></el-option>
            <el-option label="底部" value="3"></el-option>
            <el-option label="通用插播" value="4"></el-option>
          </el-select>
          <div style="color:red;margin-bottom:-10px;font-weight: 700;line-height: 20px;">注：{{this.adObj.desc[this.tUpdateData.type]}}，否则可能出现图片拉伸变形</div>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select class="query-stauts" size="mini" v-model="tUpdateData.status">
            <el-option label="未启用" value="0"></el-option>
            <el-option label="已启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="链接类型" :label-width="formLabelWidth">
          <div>
            <el-radio v-model="radioLink" label="1" border>外部链接</el-radio>
            <el-radio v-show="tUpdateData.type !=='0' && tUpdateData.type !=='3' && tUpdateData.type !=='4'" v-model="radioLink" label="2"
              border>内置页面</el-radio>
            <el-radio v-show="tUpdateData.type !=='3' " v-model="radioLink" label="3" border>无</el-radio>
          </div>
        </el-form-item>
        <el-form-item v-show="this.radioLink==='1'" label="链接地址" :label-width="formLabelWidth" prop="url">
          <el-input v-model="tUpdateData.url" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item v-show="this.radioLink==='2'" label="内置地址" :label-width="formLabelWidth">
          <el-select class="query-stauts" size="mini" v-model="innerLinkType">
            <el-option label="VIP充值" value="0"></el-option>
            <el-option label="注册" value="1"></el-option>
            <el-option label="视频" value="2"></el-option>
            <el-option label="图库" value="3"></el-option>
            <el-option label="文学" value="4"></el-option>
            <el-option label="联系" value="5"></el-option>
            <el-option label="反馈" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="tUpdateData.remark" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="广告图片" :label-width="formLabelWidth">
          <el-upload class="upload-demo" ref="upload" :auto-upload="false" action="" :http-request="startUpload" :before-upload="beforeUpload"
            :on-change="onUploadChange" list-type="picture">
            <el-button size="small" type="primary">添加广告图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCloseUploadDialog">取 消</el-button>
        <el-button type="primary" @click="onSaveSubmit" :loading="tLoadingUpdateConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改链接地址 -->
    <el-dialog title="修改链接地址" width="35%" :visible.sync="tDialogUpdateUrlVisible" :before-close="onBeforeUrlDialogClose">
      <el-form :model="tUpdateUrlObj" size="small" ref="updateUlrForm" :rules="rulesUpdateUrlForm">
        <el-form-item label="链接类型" :label-width="formLabelWidth">
          <div>
            <el-radio v-model="radioLink1" label="1" border>外部链接</el-radio>
            <el-radio v-show="this.tUpdateUrlScope !==null && this.tUpdateUrlScope.row.type !==0 && this.tUpdateUrlScope.row.type !==3 && this.tUpdateUrlScope.row.type !==4"
              v-model="radioLink1" label="2" border>内置页面</el-radio>
          </div>
        </el-form-item>
        <el-form-item v-show="this.radioLink1==='1'" label="外部链接" :label-width="formLabelWidth" prop="url">
          <el-input v-model="tUpdateUrlObj.url" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item v-show="this.radioLink1==='2'" label="内置地址" :label-width="formLabelWidth">
          <el-select class="query-stauts" size="mini" v-model="innerLinkTypeUpdate">
            <el-option label="VIP充值" value="0"></el-option>
            <el-option label="注册" value="1"></el-option>
            <el-option label="视频" value="2"></el-option>
            <el-option label="图库" value="3"></el-option>
            <el-option label="文学" value="4"></el-option>
            <el-option label="联系" value="5"></el-option>
            <el-option label="反馈" value="6"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCloseUpdateUrlDialog()">取 消</el-button>
        <el-button type="primary" @click="onUpdateUrlSubmit" :loading="tLoadingUpdateConfirm">确 定</el-button>
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
  } from '@/api/ad'
  export default {
    watch: {
      'tUpdateData.type': {
        handler: function(val, oldVal) {
          this.radioLink = '1'
        },
        deep: true
      }
    },
    methods: {
      onBeforeUrlDialogClose() {
        this.tDialogUpdateUrlVisible = false
      },
      onCloseUpdateUrlDialog() {
        this.$refs['updateUlrForm'].resetFields()
        this.tDialogUpdateUrlVisible = false
        this.tLoadingUpdateConfirm = false
      },
      onUpdateUrlSubmit() {
        this.$refs['updateUlrForm'].validate((valid) => {
          if (valid) {
            const lastUlr = this.radioLink1 === '1' ? this.tUpdateUrlObj.url : this.innerLinkTypeUpdate
            this.tLoadingUpdateConfirm = true
            update({
              uuid: this.tUpdateUrlScope.row.uuid,
              url: lastUlr
            }).then(r => {
              this.tUpdateUrlScope.row.url = lastUlr
              this.tLoadingUpdateConfirm = false
              this.tDialogUpdateUrlVisible = false
              this.$message({
                type: 'success',
                message: '操作成功！'
              })
            }).catch(() => {
              this.tLoadingUpdateConfirm = false
            })
          }
        })
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
      modifyUrl(scope) {
        if (scope.row.url === 'null' || scope.row.url === '') {
          this.radioLink1 = '1'
        } else if (/^(http|https):\/\/[\s\S]*[^/]$/.test(scope.row.url)) {
          this.radioLink1 = '1'
          this.tUpdateUrlObj.url = scope.row.url
        } else {
          this.radioLink1 = '2'
          this.innerLinkTypeUpdate = scope.row.url
        }
        this.tUpdateUrlScope = scope
        this.tDialogUpdateUrlVisible = true
      },
      modifyRemark(scope) {
        this.$prompt('修改备注', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.remark,
          lockScroll: false,
          inputPlaceholder: '请输入备注',
          inputType: 'text',
          inputValidator: function(v) {
            v = v || ''
            if (v.trim() === '') {
              return '备注不能为空！'
            }
            if (v.length > 45) {
              return '备注长度不能查过45个字符'
            }
            return true
          }
        }).then(({
          value
        }) => {
          update({
            uuid: scope.row.uuid,
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
      initQueryData() {
        this.tQueryData = {
          sort: '1',
          sortfiled: 'createtime',
          page: 1,
          size: 10,
          type: 'null',
          status: 'null',
          title: '',
          url: '',
          createtime: []
        }
      },
      initUpadateData() {
        this.tUpdateData = {
          title: '',
          extname: '',
          type: '0',
          status: '0',
          url: '',
          remark: ''
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
      onSaveDialogShow() {
        this.initUpadateData()
        this.tDialogSaveVisible = true
      },
      onSaveSubmit() {
        this.$refs['newForm'].validate((valid) => {
          if (valid) {
            if (!this.hasFile) {
              this.$message({
                type: 'error',
                message: '请添加广告图片！',
                duration: 3 * 1000
              })
            } else {
              this.tLoadingUpdateConfirm = true
              this.$refs.upload.submit()
            }
          }
        })
      },
      onUploadChange(f, fileList) {
        const ext = f.name.substring(f.name.length - 3)
        let r = false
        const arr = ['jpg', 'png', 'gif']
        arr.forEach(e => {
          if (e === ext) {
            r = true
          }
        })
        if (!r) {
          this.$refs.upload.clearFiles()
        } else {
          this.hasFile = true
        }
      },
      beforeUpload(file) {
        this.fd = new FormData()
        this.fd.append('title', this.tUpdateData.title)
        this.fd.append('extname', file.name.split('.')[1])
        this.fd.append('type', this.tUpdateData.type)
        this.fd.append('status', this.tUpdateData.status)
        this.fd.append('url', this.tUpdateData.url)
        this.fd.append('remark', this.tUpdateData.remark)
        this.fd.append('file', file)
      },
      startUpload() {
        upload(this.fd).then(response => {
          this.tLoadingUpdateConfirm = false
          this.tDialogSaveVisible = false
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.onQuerySubmit()
          this.onCloseUploadDialog()
        }).catch(() => {
          this.tLoadingUpdateConfirm = false
        })
      },
      onBeforeClose(done) {
        this.$refs.upload.clearFiles()
        done()
      },
      onCloseUploadDialog() {
        this.$refs.newForm.resetFields()
        this.tDialogSaveVisible = false
        this.$refs.upload.clearFiles()
      },
      onDelete(scope) {
        this.$confirm('删除标题为 ' + scope.row.title + ' 的记录？此操作将永久删除该记录, 是否继续?', '提示', {
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
        this.onQuerySubmit(true)
      },
      modifyStatus(scope) {
        const d = Math.abs(scope.row.status - 1)
        if (scope.row.status === 1) {
          // 改成未发布
          this.$confirm('确定停用标题为 ' + scope.row.title + ' 的广告？', '是否停用', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                update({
                  uuid: scope.row.uuid,
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
              message: '已取消操作'
            })
          })
        } else {
          // 发布
          this.$confirm('确定启用标题为 ' + scope.row.title + ' 的广告？', '是否启用', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                update({
                  uuid: scope.row.uuid,
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
              message: '操作成功!'
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
      const titleValidator = (rule, value, callback) => {
        value = value || ''
        value = value.replace(/\s+/g, '')
        if (this.tUpdateData.type === '1' || this.tUpdateData.type === '3') {
          if (value === '') {
            callback(new Error('标题不能为空'))
          }
        }

        if (value.length > 32) {
          callback(new Error('标题不能超过32位'))
        }
        callback()
      }
      const urlValidator = (rule, value, callback) => {
        value = value || ''
        if (this.radioLink === '2') {
          this.tUpdateData.url = this.innerLinkType
          callback()
        }
        if (this.radioLink === '3') {
          callback()
        }
        if (value === '') {
          callback(new Error('链接地址不能为空！'))
        }
        if (!/^(http|https):\/\/[\s\S]*[^/]$/.test(value)) {
          callback(new Error('链接地址格式错误！'))
        }
        callback()
      }
      const urlValidator1 = (rule, value, callback) => {
        value = value || ''
        if (this.radioLink1 === '2') {
          this.tUpdateUrlObj.url = this.innerLinkType
          callback()
        }
        if (this.radioLink1 === '3') {
          callback()
        }
        if (value === '') {
          callback(new Error('跳转地址不能为空！'))
        }
        if (!/^(http|https):\/\/[\s\S]*[^/]$/.test(value)) {
          callback(new Error('链接地址格式错误！'))
        }
        callback()
      }

      const remarkValidator = (rule, value, callback) => {
        value = value || ''
        if (value.length !== '' && value.length > 45) {
          callback(new Error('备注不能超过45个字'))
        }
        callback()
      }
      return {
        rType: 0, // 0是外部链接
        tDialogUpdateUrlVisible: false,
        linkObj: {
          name: ['VIP充值', '注册', '视频', '图库', '文学', '联系', '反馈']
        },
        adObj: {
          name: ['启动页', '首页轮播', '首页导航', '底部', '通用插播'],
          desc: [
            '启动页图片大小建议400*800',
            '首页轮播图片大小建议500*600',
            '首页导航图片大小建议100*200',
            '底部图片大小建议100*200',
            '通用插播图片大小建议300*300'
          ]
        },
        tUpdateUrlObj: {
          url: ''
        },
        tUpdateUrlScope: null,
        innerLinkType: '0',
        innerLinkTypeUpdate: '0',
        radioLink: '1',
        radioLink1: '1',
        hasFile: false,
        adType: ['启动页', '首页轮播', '首页导航', '底部', '通用插播'],
        fd: null,
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
        rulesUpdateUrlForm: {
          url: [{
            validator: urlValidator1,
            trigger: 'blur'
          }]
        },
        rulesNewForm: {
          title: [{
            validator: titleValidator,
            trigger: 'blur'
          }],
          url: [{
            validator: urlValidator,
            trigger: 'blur'
          }],
          remark: [{
            validator: remarkValidator,
            trigger: 'blur'
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
