<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <el-collapse @change="handleChange">
      <el-collapse-item name="1" v-if="name==='superadmin'">
        <template slot="title">
          <i class="el-icon-menu"></i> 超管密码设置
        </template>
        <el-form :inline="true" size="mini" :model="modifyPwdFormForSuperAdmin" :rules="rulesForModifyPwdFormForSuperAdmin" ref="modifyPwdFormForSuperAdmin"
          label-width="100px" class="demo-resetPwdForm">
          <el-form-item label="旧密码" prop="oldpwd">
            <el-input v-model="modifyPwdFormForSuperAdmin.oldpwd" clearable></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpwd">
            <el-input v-model="modifyPwdFormForSuperAdmin.newpwd" clearable></el-input>
          </el-form-item>
          <el-form-item label="重复新密码" prop="renewpwd">
            <el-input v-model="modifyPwdFormForSuperAdmin.renewpwd" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="modifySuperPwd('modifyPwdFormForSuperAdmin')">修改</el-button>
            <el-button @click="resetForm('modifyPwdFormForSuperAdmin')">清空</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" size="mini" :model="resetAdminPwdForm" :rules="rulesForresetAdminPwdForm" ref="resetAdminPwdForm"
          label-width="100px" class="demo-resetPwdForm">
          <el-form-item label="新密码" prop="newpwd">
            <el-input v-model="resetAdminPwdForm.newpwd" clearable></el-input>
          </el-form-item>
          <el-form-item label="重复新密码" prop="renewpwd">
            <el-input v-model="resetAdminPwdForm.renewpwd" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="resetBAdminPwd('resetAdminPwdForm')">重置普通管理员密码</el-button>
            <el-button @click="resetForm('resetAdminPwdForm')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2" v-if="name==='superadmin'">
        <template slot="title">
          <i class="el-icon-menu"></i> 超管其他设置
        </template>
        <el-form size="mini" :inline="true" label-position="top" :model="settingFormSuper" :rules="rulesForSuperAdminSetting" ref="settingFormSuper"
          label-width="100px" class="demo-settingFormSuper">
          <el-form-item label="(B站)管理员账号：" prop="admin_name">
            <el-input v-model="settingFormSuper.admin_name"></el-input>
          </el-form-item>
          <el-form-item label="A1的请求地址：" prop="a1_apiurl">
            <el-input v-model="settingFormSuper.a1_apiurl"></el-input>
          </el-form-item>
          <el-form-item label="访问A1的key：" prop="a1_apikey">
            <el-input v-model="settingFormSuper.a1_apikey"></el-input>
          </el-form-item>
          <el-form-item label="B站的编号，对应A1记录t_site.id：" prop="siteid">
            <el-input v-model="settingFormSuper.siteid"></el-input>
          </el-form-item>
          <el-form-item label="B站的域名：" prop="domain">
            <el-input v-model="settingFormSuper.domain"></el-input>
          </el-form-item>
          <el-form-item label="后台路径：" prop="path_manager">
            <el-input v-model="settingFormSuper.path_manager"></el-input>
          </el-form-item>
          <el-form-item label="APP前端路径：" prop="path_view">
            <el-input v-model="settingFormSuper.path_view"></el-input>
          </el-form-item>
          <el-form-item label="跳转路径：" prop="path_medium">
            <el-input v-model="settingFormSuper.path_medium"></el-input>
          </el-form-item>
          <el-form-item label="超级路径：" prop="path_super">
            <el-input v-model="settingFormSuper.path_super"></el-input>
          </el-form-item>
          <el-form-item label="支付回调路径：" prop="path_payment">
            <el-input v-model="settingFormSuper.path_payment"></el-input>
          </el-form-item>
          <el-form-item label="广告图片路径：" prop="path_ad">
            <el-input v-model="settingFormSuper.path_ad"></el-input>
          </el-form-item>
          <el-form-item label="操作">
            <el-button type="primary" @click="loadSuperSetting">读取</el-button>
            <el-button type="primary" @click="updateSuperSetting('settingFormSuper')">修改</el-button>
            <el-button @click="resetForm('settingFormSuper')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="3" v-if="name==='superadmin'">
        <template slot="title">
          <i class="el-icon-menu"></i> 数据加载
        </template>
        <div>
          <el-button size="mini" type="primary" icon="el-icon-refresh">加载A1配置</el-button>
          <el-button size="mini" type="primary" icon="el-icon-refresh">加载A1视频资源</el-button>
          <el-button size="mini" type="primary" icon="el-icon-refresh">加载A1文学资源</el-button>
          <el-button size="mini" type="primary" icon="el-icon-refresh">加载A1图库资源</el-button>
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <i class="el-icon-menu"></i> 管理员密码设置
        </template>
        <el-form :inline="true" size="mini" :model="modifyPwdFormForAdmin" :rules="rulesForModifyPwdFormForAdmin" ref="modifyPwdFormForAdmin"
          label-width="100px" class="demo-resetPwdForm">
          <el-form-item label="旧密码" prop="oldpwd">
            <el-input v-model="modifyPwdFormForAdmin.oldpwd" clearable></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpwd">
            <el-input v-model="modifyPwdFormForAdmin.newpwd" clearable></el-input>
          </el-form-item>
          <el-form-item label="重复新密码" prop="renewpwd">
            <el-input v-model="modifyPwdFormForAdmin.renewpwd" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="modifyPwd('modifyPwdFormForAdmin')">修改</el-button>
            <el-button @click="resetForm('modifyPwdFormForAdmin')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="5">
        <template slot="title">
          <i class="el-icon-menu"></i> 其他设置
        </template>
        <el-form size="mini" :inline="false" label-position="right" :model="settingFormAdmin" :rules="rulesForAdminSetting" ref="settingFormAdmin"
          label-width="250px" class="demo-settingFormSuper">
          <div class="zhb-title">基础设置</div>
          <el-form-item prop="guest_mode">

            <el-switch v-model="guestModeSwitch" active-color="#13ce66">
            </el-switch>
            <template slot="label">游客模式
              <el-popover ref="popover-guest-mode" placement="top-start" title="什么是游客模式？" trigger="hover" content="游客是否可看免费资源。">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-guest-mode></i>
            </template>
            <!-- v-popover:popover-guest-mode -->
            <!-- <el-input v-model="settingFormAdmin.guest_mode"></el-input> -->
          </el-form-item>
          <el-form-item prop="url_share">
            <template slot="label">
              分享和下载最新APP的链接地址
              <el-popover ref="popover-url-share" placement="top-start" title="温馨提示" trigger="hover" content="链接地址必须是http或https开头">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-share></i>
            </template>
            <el-input v-model="settingFormAdmin.url_share"></el-input>
          </el-form-item>
          <el-form-item prop="url_online">
            <template slot="label">
              在线客服的链接地址
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="在线客服地址必须是http或https开头">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingFormAdmin.url_online"></el-input>
          </el-form-item>
          <el-form-item prop="kf_qq">
            <template slot="label">
              客服QQ号
              <el-popover ref="popover-kf-qq" placement="top-start" title="温馨提示" trigger="hover" content="QQ号码必须是纯数字">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-kf-qq></i>
            </template>
            <el-input v-model="settingFormAdmin.kf_qq"></el-input>
          </el-form-item>
          <el-form-item prop="kf_wechat">
            <template slot="label">
              客服微信号
              <el-popover ref="popover-kf-wechat" placement="top-start" title="温馨提示" trigger="hover" content="微信客服不能为空">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-kf-wechat></i>
            </template>
            <el-input v-model="settingFormAdmin.kf_wechat"></el-input>
          </el-form-item>
          <div class="zhb-title">资源时长限制设置</div>
          <el-form-item prop="vip_video_time">
            <template slot="label">
              超过多少时长仅VIP可看的视频
              <el-popover ref="popover-video-time" placement="top-start" title="温馨提示" trigger="hover" content="必须是5~60分钟之内">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-video-time></i>
            </template>
            <el-input v-model="settingFormAdmin.vip_video_time"></el-input>
          </el-form-item>
          <el-form-item prop="vip_book_length">
            <template slot="label">
              超过多少长度仅VIP可看的文学
              <el-popover ref="popover-book-length" placement="top-start" title="温馨提示" trigger="hover" content="必须是100~1000字之内">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-book-length></i>
            </template>
            <el-input v-model="settingFormAdmin.vip_book_length"></el-input>
          </el-form-item>
          <el-form-item prop="vip_pic_total">
            <template slot="label">
              超过多少张仅VIP可看的图库
              <el-popover ref="popover-pic-total" placement="top-start" title="温馨提示" trigger="hover" content="必须是3~10张">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-pic-total></i>
            </template>
            <el-input v-model="settingFormAdmin.vip_pic_total"></el-input>
          </el-form-item>
          <div class="zhb-title">视频、图片、文学列表广告间隔设置</div>
          <el-form-item prop="ad_video">
            <template slot="label">
              每隔几份视频列表插播广告
              <el-popover ref="popover-ad-video" placement="top-start" title="温馨提示" trigger="hover" content="ad video 必须是整数">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-ad-video></i>
            </template>
            <el-input v-model="settingFormAdmin.ad_video"></el-input>
          </el-form-item>
          <el-form-item prop="ad_book">
            <template slot="label">
              每隔几份文学列表插播广告
              <el-popover ref="popover-ad-book" placement="top-start" title="温馨提示" trigger="hover" content="ad book 必须是整数">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-ad-book></i>
            </template>
            <el-input v-model="settingFormAdmin.ad_book"></el-input>
          </el-form-item>
          <el-form-item prop="ad_pic">
            <template slot="label">
              每隔几份图库列表插播广告
              <el-popover ref="popover-ad-pic" placement="top-start" title="温馨提示" trigger="hover" content="ad book 必须是整数">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-ad-pic></i>
            </template>
            <el-input v-model="settingFormAdmin.ad_pic"></el-input>
          </el-form-item>
          <div class="zhb-title">虚拟播放量、查看量、阅读量设置</div>
          <el-form-item prop="pv_video_base">
            <template slot="label">
              视频虚拟播放量基数
              <el-popover ref="popover-video-base" placement="top-start" title="温馨提示" trigger="hover" content="video base 必须是整数">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-video-base></i>
            </template>
            <el-input v-model="settingFormAdmin.pv_video_base"></el-input>
          </el-form-item>
          <el-form-item prop="pv_video_multiple">
            <template slot="label">
              视频虚拟播放量倍数
              <el-popover ref="popover-video-multiple" placement="top-start" title="温馨提示" trigger="hover" content="video multiple 必须是整数">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-video-multiple></i>
            </template>
            <el-input v-model="settingFormAdmin.pv_video_multiple"></el-input>
          </el-form-item>
          <el-form-item label="文学虚拟阅读量基数 ：" prop="pv_book_base">
            <template slot="label">
              视频虚拟播放量倍数
              <el-popover ref="popover-book-base" placement="top-start" title="温馨提示" trigger="hover" content="book base 必须是整数">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-book-base></i>
            </template>
            <el-input v-model="settingFormAdmin.pv_book_base"></el-input>
          </el-form-item>
          <el-form-item prop="pv_book_multiple">
            <template slot="label">
              文学虚拟阅读量倍数
              <el-popover ref="popover-book-multiple" placement="top-start" title="温馨提示" trigger="hover" content="book multiple 必须是整数">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-book-multiple></i>
            </template>
            <el-input v-model="settingFormAdmin.pv_book_multiple"></el-input>
          </el-form-item>
          <el-form-item prop="pv_pic_base">
            <template slot="label">
              图库虚拟阅读量基数
              <el-popover ref="popover-pic-base" placement="top-start" title="温馨提示" trigger="hover" content="pic base 必须是整数">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-pic-base></i>
            </template>
            <el-input v-model="settingFormAdmin.pv_pic_base"></el-input>
          </el-form-item>
          <el-form-item prop="pv_pic_multiple">
            <template slot="label">
              图库虚拟阅读量倍数
              <el-popover ref="popover-pic-multiple" placement="top-start" title="温馨提示" trigger="hover" content="pic multiple 必须是整数">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-pic-multiple></i>
            </template>
            <el-input v-model="settingFormAdmin.pv_pic_multiple"></el-input>
          </el-form-item>
          <div class="zhb-title">会员充值价格设置</div>
          <el-form-item prop="price_month">
            <template slot="label">
              月VIP价格
              <el-popover ref="popover-price-month" placement="top-start" title="温馨提示" trigger="hover" content="price month 必须是整数">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-price-month></i>
            </template>
            <el-input v-model="settingFormAdmin.price_month"></el-input>
          </el-form-item>
          <el-form-item prop="price_season">
            <template slot="label">
              季度VIP价格
              <el-popover ref="popover-price-season" placement="top-start" title="温馨提示" trigger="hover" content="price season 必须是整数">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-price-season></i>
            </template>
            <el-input v-model="settingFormAdmin.price_season"></el-input>
          </el-form-item>
          <el-form-item prop="price_half">
            <template slot="label">
              半年VIP价格
              <el-popover ref="popover-price-half" placement="top-start" title="温馨提示" trigger="hover" content="price half 必须是整数">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-price-half></i>
            </template>
            <el-input v-model="settingFormAdmin.price_half"></el-input>
          </el-form-item>
          <el-form-item prop="price_year">
            <template slot="label">
              全年VIP价格
              <el-popover ref="popover-price-year" placement="top-start" title="温馨提示" trigger="hover" content="price year 必须是整数">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-price-year></i>
            </template>
            <el-input v-model="settingFormAdmin.price_year"></el-input>
          </el-form-item>
          <el-form-item label="操作">
            <!-- <el-button type="primary" @click="loadSetting">读取</el-button> -->
            <el-button type="primary" @click="updateSetting('settingFormAdmin')">保存设置</el-button>
            <el-button @click="resetForm('settingFormAdmin')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>

    </el-collapse>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    modifyPwd,
    modifySuperPwd,
    resetBAdminPwd,
    updateSetting,
    updateSuperSetting,
    loadSetting,
    loadSuperSetting
  } from '@/api/setting'
  export default {
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    data() {
      const validator_reg_str = (rule, value, callback) => {
        value = value || ''
        if (!/^[a-zA-Z_0-9]+$/.test(value)) {
          callback(new Error('只能包含大小写字母和_'))
        } else {
          callback()
        }
      }
      const validator_reg_str_or_empty = (rule, value, callback) => {
        value = value || ''
        if (value === '') {
          callback()
        }
        if (!/^[a-zA-Z_0-9]+$/.test(value)) {
          callback(new Error('为空或者只能包含大小写字母和_'))
        } else {
          callback()
        }
      }
      const validator_reg_link = (rule, value, callback) => {
        value = value || ''
        if (!/^(http|https):\/\/[\s\S]*[^/]$/.test(value)) {
          callback(new Error('必须是有效的链接'))
        } else {
          callback()
        }
      }
      const validator_reg_link_or_empty = (rule, value, callback) => {
        value = value || ''
        if (value === '') {
          callback()
        }
        if (!/^(http|https):\/\/[\s\S]*[^/]$/.test(value)) {
          callback(new Error('为空或者有效的链接'))
        } else {
          callback()
        }
      }
      const validator_reg_int = (rule, value, callback) => {
        value = value || ''
        if (!/^\d+$/.test(value)) {
          callback(new Error('只能是整数'))
        } else {
          callback()
        }
      }
      const validator_reg_int_or_empty = (rule, value, callback) => {
        value = value || ''
        if (value === '') {
          callback()
        }
        if (!/^\d+$/.test(value)) {
          callback(new Error('只为空或者整数'))
        } else {
          callback()
        }
      }
      return {
        guestModeSwitch: false,
        modifyPwdFormForAdmin: {
          oldpwd: '',
          newpwd: '',
          renewpwd: ''
        },
        modifyPwdFormForSuperAdmin: {
          oldpwd: '',
          newpwd: '',
          renewpwd: ''
        },
        resetAdminPwdForm: {
          newpwd: '',
          renewpwd: ''
        },
        settingFormSuper: {
          admin_name: '',
          a1_apiurl: '',
          a1_apikey: '',
          siteid: '',
          domain: '',
          path_manager: '',
          path_view: '',
          path_medium: '',
          path_super: '',
          path_payment: '',
          path_ad: ''
        },
        settingFormAdmin: {
          guest_mode: '',
          url_share: '',
          url_online: '',
          kf_qq: '',
          kf_wechat: '',
          vip_video_time: '',
          vip_book_length: '',
          vip_pic_total: '',
          ad_video: '',
          ad_book: '',
          ad_pic: '',
          pv_video_base: '',
          pv_video_multiple: '',
          pv_book_base: '',
          pv_book_multiple: '',
          pv_pic_base: '',
          pv_pic_multiple: '',
          price_month: '',
          price_season: '',
          price_half: '',
          price_year: ''
        },
        rulesForSuperAdminSetting: {
          admin_name: [{
            validator: validator_reg_str,
            trigger: 'blur'
          },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          a1_apiurl: {
            validator: validator_reg_link,
            trigger: 'blur'
          },
          a1_apikey: {
            validator: validator_reg_str,
            trigger: 'blur'
          },
          siteid: {
            validator: validator_reg_int,
            trigger: 'blur'
          },
          domain: {
            validator: validator_reg_link,
            trigger: 'blur'
          },
          path_manager: {
            validator: validator_reg_str,
            trigger: 'blur'
          },
          path_view: {
            validator: validator_reg_str,
            trigger: 'blur'
          },
          path_medium: {
            validator: validator_reg_str,
            trigger: 'blur'
          },
          path_super: {
            validator: validator_reg_str,
            trigger: 'blur'
          },
          path_payment: {
            validator: validator_reg_str,
            trigger: 'blur'
          },
          path_ad: {
            validator: validator_reg_str,
            trigger: 'blur'
          }
        },
        rulesForAdminSetting: {
          url_share: {
            validator: validator_reg_link_or_empty,
            trigger: 'blur'
          },
          url_online: {
            validator: validator_reg_link_or_empty,
            trigger: 'blur'
          },
          kf_qq: {
            validator: validator_reg_int_or_empty,
            trigger: 'blur'
          },
          kf_wechat: {
            validator: validator_reg_str_or_empty,
            trigger: 'blur'
          },
          vip_video_time: [
            {
              validator: validator_reg_int,
              trigger: 'blur'
            }, {
              validator: (rule, value, callback) => {
                value = value || ''
                if (value < 5 || value > 60) {
                  callback(new Error('只能是5~60分钟之内'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],
          vip_book_length: [
            {
              validator: validator_reg_int,
              trigger: 'blur'
            }, {
              validator: (rule, value, callback) => {
                value = value || ''
                if (value < 100 || value > 1000) {
                  callback(new Error('只能是100~1000字之内'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],
          vip_pic_total: [
            {
              validator: validator_reg_int,
              trigger: 'blur'
            }, {
              validator: (rule, value, callback) => {
                value = value || ''
                if (value < 3 || value > 10) {
                  callback(new Error('只能是3~10张之内'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],
          ad_video: {
            validator: validator_reg_int,
            trigger: 'blur'
          },
          ad_book: {
            validator: validator_reg_int,
            trigger: 'blur'
          },
          ad_pic: {
            validator: validator_reg_int,
            trigger: 'blur'
          },
          pv_video_base: {
            validator: validator_reg_int,
            trigger: 'blur'
          },
          pv_video_multiple: {
            validator: validator_reg_int,
            trigger: 'blur'
          },
          pv_book_base: {
            validator: validator_reg_int,
            trigger: 'blur'
          },
          pv_book_multiple: {
            validator: validator_reg_int,
            trigger: 'blur'
          },
          pv_pic_base: {
            validator: validator_reg_int,
            trigger: 'blur'
          },
          pv_pic_multiple: {
            validator: validator_reg_int,
            trigger: 'blur'
          },
          price_month: {
            validator: validator_reg_int,
            trigger: 'blur'
          },
          price_season: {
            validator: validator_reg_int,
            trigger: 'blur'
          },
          price_half: {
            validator: validator_reg_int,
            trigger: 'blur'
          },
          price_year: {
            validator: validator_reg_int,
            trigger: 'blur'
          }
        },
        rulesForModifyPwdFormForAdmin: {
          oldpwd: [{
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 10,
            message: '密码长度在 5 到 10 个字符',
            trigger: 'blur'
          }
          ],
          newpwd: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 10,
            message: '密码长度在 5 到 10 个字符',
            trigger: 'blur'
          }
          ],
          renewpwd: [{
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 10,
            message: '密码长度在 5 到 10 个字符',
            trigger: 'blur'
          }
          ]
        },
        rulesForModifyPwdFormForSuperAdmin: {
          oldpwd: [{
            required: true,
            message: '请输入超管旧密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 10,
            message: '密码长度在 5 到 10 个字符',
            trigger: 'blur'
          }
          ],
          newpwd: [{
            required: true,
            message: '请输入超管新密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 10,
            message: '密码长度在 5 到 10 个字符',
            trigger: 'blur'
          }
          ],
          renewpwd: [{
            required: true,
            message: '请再次输入超管新密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 10,
            message: '密码长度在 5 到 10 个字符',
            trigger: 'blur'
          }
          ]
        },
        rulesForresetAdminPwdForm: {
          newpwd: [{
            required: true,
            message: '请输入B站管理员新密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 10,
            message: '密码长度在 5 到 10 个字符',
            trigger: 'blur'
          }
          ],
          renewpwd: [{
            required: true,
            message: '请再次输入B站管理员新密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 10,
            message: '密码长度在 5 到 10 个字符',
            trigger: 'blur'
          }
          ]
        }
      }
    },
    methods: {
      handleChange(val) {
        const v = parseInt(val[0])
        switch (v) {
          case 5: {
            this.loadSetting()
            break
          } default:break
        }
      },
      // 修改管理员密码
      modifyPwd(forName) {
        this.$refs[forName].validate((valid) => {
          if (!valid) {
            return false
          }
          if (this.modifyPwdFormForAdmin.newpwd !== this.modifyPwdFormForAdmin.renewpwd) {
            this.$message.error('两次密码不一致，请重新输入')
            return false
          }
          modifyPwd(this.modifyPwdFormForAdmin).then(response => {
            this.$alert('新密码为：' + this.modifyPwdFormForAdmin.newpwd + '，请点击重新登录重新验证！', '温馨提示', {
              confirmButtonText: '重新登录',
              type: 'warning',
              callback: action => {
                this.$store.dispatch('LogOut').then(() => {
                  location.reload() // 为了重新实例化vue-router对象 避免bug
                })
              }
            })
          })
        })
      },
      // 修改超管密码
      modifySuperPwd(forName) {
        this.$refs[forName].validate((valid) => {
          if (!valid) {
            return false
          }
          if (this.modifyPwdFormForSuperAdmin.newpwd !== this.modifyPwdFormForSuperAdmin.renewpwd) {
            this.$message.error('两次密码不一致，请重新输入')
            return false
          }
          modifySuperPwd(this.modifyPwdFormForSuperAdmin).then(response => {
            this.$alert('新密码为：' + this.modifyPwdFormForSuperAdmin.newpwd + '，请点击重新登录重新验证！', '温馨提示', {
              confirmButtonText: '重新登录',
              type: 'warning',
              callback: action => {
                this.$store.dispatch('LogOut').then(() => {
                  location.reload() // 为了重新实例化vue-router对象 避免bug
                })
              }
            })
          })
        })
      },
      resetBAdminPwd(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false
          }
          if (this.resetAdminPwdForm.newpwd !== this.resetAdminPwdForm.renewpwd) {
            this.$message.error('两次密码不一致，请重新输入')
            return false
          }
          resetBAdminPwd(this.resetAdminPwdForm).then(response => {
            this.$alert('B站管理已重置为：' + this.resetAdminPwdForm.newpwd + '！', '温馨提示')
          })
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      updateSetting(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false
          }
          this.settingFormAdmin.guest_mode = this.guestModeSwitch ? '1' : '0'
          updateSetting(this.settingFormAdmin).then(response => {
            this.$alert('修改成功！', '温馨提示', {
              type: 'success'
            })
          })
        })
      },
      updateSuperSetting(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false
          }
          updateSuperSetting(this.settingFormSuper).then(response => {
            this.$alert('修改超管其他设置成功！', '温馨提示', {
              type: 'success'
            })
          })
        })
      },
      loadSetting() {
        loadSetting().then(response => {
          this.settingFormAdmin = response.data
        })
      },
      loadSuperSetting() {
        loadSuperSetting().then(response => {
          this.settingFormSuper = response.data
        })
      }
    }

  }

</script>

<style rel="stylesheet/scss" lang="scss">
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .el-collapse-item__content {
    background: #f3f3f3;
    padding: 30px 50px 50px 50px;
  }

  .el-form--label-top .el-form-item__label {
    padding: 0px;
  }

  .icon-zhb {
    color: #b7b2b2;
    cursor: pointer;
  }
.zhb-title{
  text-align: center;
  background: #e0e0e0;
  padding:5px;
}
</style>
