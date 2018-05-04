<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <el-collapse @change="handleChange">
      <el-collapse-item name="1" v-if="name==='superadmin'">
        <template slot="title">
          <i class="el-icon-menu"></i> 超管修改密码
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
            <el-button type="primary" @click="modifySuperPwd('modifyPwdFormForSuperAdmin')">保存设置</el-button>
            <!-- <el-button @click="resetForm('modifyPwdFormForSuperAdmin')">清空</el-button> -->
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
            <!-- <el-button @click="resetForm('resetAdminPwdForm')">清空</el-button> -->
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2" v-if="name==='superadmin'">
        <template slot="title">
          <i class="el-icon-menu"></i> 超管基本设置
        </template>
        <el-form size="mini" :inline="false" label-position="right" :model="settingFormSuper" :rules="rulesForSuperAdminSetting" ref="settingFormSuper"
          label-width="250px" class="demo-settingFormSuper">
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

          <el-form-item label="paysapi_uid：" prop="paysapi_uid">
            <el-input v-model="settingFormSuper.paysapi_uid"></el-input>
          </el-form-item>
          <el-form-item label="paysapi_token：" prop="paysapi_token">
            <el-input v-model="settingFormSuper.paysapi_token"></el-input>
          </el-form-item>
          <el-form-item label="二维码过期时间（秒）：" prop="paysapi_expire">
            <el-input v-model="settingFormSuper.paysapi_expire"></el-input>
          </el-form-item>
          <el-form-item label="操作">
            <!-- <el-button type="primary" @click="loadSuperSetting">读取设置</el-button> -->
            <el-button type="primary" @click="updateSuperSetting('settingFormSuper')">保存设置</el-button>
            <!-- <el-button @click="resetForm('settingFormSuper')">清空</el-button> -->
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="3" v-if="name==='superadmin'">
        <template slot="title">
          <i class="el-icon-menu"></i> 数据加载
        </template>
        <div>
          <el-button size="mini" type="primary" icon="el-icon-refresh" @click="reload_a1" :loading="loading_a1">加载A1配置</el-button>
          <el-button size="mini" type="primary" icon="el-icon-refresh" @click="reload_video" :loading="loading_video">加载A1视频资源</el-button>
          <el-button size="mini" type="primary" icon="el-icon-refresh" @click="reload_book" :loading="loading_book">加载A1文学资源</el-button>
          <el-button size="mini" type="primary" icon="el-icon-refresh" @click="reload_pic" :loading="loading_pic">加载A1图库资源</el-button>
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <i class="el-icon-menu"></i> 修改密码
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
            <el-button type="primary" @click="modifyPwd('modifyPwdFormForAdmin')">保存设置</el-button>
            <!-- <el-button @click="resetForm('modifyPwdFormForAdmin')">清空</el-button> -->
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="5">
        <template slot="title">
          <i class="el-icon-menu"></i> 基本设置
        </template>
        <el-form size="mini" :inline="false" label-position="right" :model="settingFormAdmin" :rules="rulesForAdminSetting" ref="settingFormAdmin"
          label-width="250px" class="demo-settingFormSuper">
          <div style="font-weight:700; color: red;text-align:center;padding:5px;">温馨提示：修改后需点击下方“保存设置”才能生效！</div>
          <span class="zhb-title">基础设置</span>
          <div style="height: 15px;">&nbsp;&nbsp;</div>
          <el-form-item prop="guest_mode">

            <el-switch v-model="guestModeSwitch" active-color="#13ce66">
            </el-switch>
            <span class="zhb-haha" v-show="guestModeSwitch">用户未登录也可以观看免费资源</span>
            <span class="zhb-haha" v-show="!guestModeSwitch">用户需登录才可以观看免费资源</span>
            <template slot="label">游客模式
              <el-popover ref="popover-guest-mode" placement="top-start" title="什么是游客模式？" trigger="hover">
                设置用户点击观看免费资源（视频/图库/文学）的权限：
                <br> • 开启：用户未登录就可以直接点击观看免费资源
                <br> • 关闭：用户至少需登录后才能点击观看免费资源
                <br>
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-guest-mode></i>
            </template>
            <!-- v-popover:popover-guest-mode -->
            <!-- <el-input v-model="settingFormAdmin.guest_mode"></el-input> -->
          </el-form-item>
          <el-form-item prop="url_share">
            <template slot="label">
              分享和下载最新APP的链接地址
              <el-popover ref="popover-url-share" placement="top-start" title="温馨提示" trigger="hover">
                建议自行搭建一个推广下载APP的导航网站：
                <br> • 该网站只需要一个静态的主页，该主页内容包含APP的简介展示、安卓版下载、苹果下载、苹果信任的截图教程；
                <br> • 只需租一台配置普通的VPS服务器、解析推广域名，将网页源码上传至服务器。网页源码可由平台制作，或自行编写；
                <br> • 因此将APP的服务器及域名、与导航站的服务器及域名独立开，平时只需推广导航站，不暴露APP服务器及域名；
                <br> • 若重新打包APP，只需修改导航站的主页源码中的下载地址；
                <br> • 若填写该地址，将在APP端显示按钮“我的—分享APP下载”，点击后将在浏览器中打开。
                <br>

              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-share></i>
            </template>
            <el-input v-model="settingFormAdmin.url_share" placeholder="http:// 或 https://开头的网址"></el-input>
          </el-form-item>
          <el-form-item prop="url_online">
            <template slot="label">
              在线客服的链接地址
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover">
                • 可选择是否接入在线客服聊天系统、或QQ聊天对话窗口等；
                <br> • 若填写该地址，将在APP端显示按钮“我的—在线客服”，点击后将在浏览器中打开。
                <br>
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingFormAdmin.url_online" placeholder="http:// 或 https://开头的网址"></el-input>
          </el-form-item>
          <el-form-item prop="kf_qq">
            <template slot="label">
              客服QQ号
              <el-popover ref="popover-kf-qq" placement="top-start" title="温馨提示" trigger="hover">
                • 若填写，将出现在APP端“我的—联系我们”中；
                <br> • 建议客服QQ号与微信号至少有一个，引导用户添加好友，尤其是苹果APP重新打包时可推送重下载，以及其他维护开发；
                <br> • 若客服QQ号与微信号均未填写，APP端不显示按钮“我的—联系我们”。
                <br>
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-kf-qq></i>
            </template>
            <el-input v-model="settingFormAdmin.kf_qq" placeholder="可选"></el-input>
          </el-form-item>
          <el-form-item prop="kf_wechat">
            <template slot="label">
              客服微信号
              <el-popover ref="popover-kf-wechat" placement="top-start" title="温馨提示" trigger="hover">
                • 若填写，将出现在APP端“我的—联系我们”中；
                <br> • 建议客服QQ号与微信号至少有一个，引导用户添加好友，尤其是苹果APP重新打包时可推送重下载，以及其他维护开发；
                <br> • 若客服QQ号与微信号均未填写，APP端不显示按钮“我的—联系我们”。
                <br>
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-kf-wechat></i>
            </template>
            <el-input v-model="settingFormAdmin.kf_wechat" placeholder="可选"></el-input>
          </el-form-item>
          <hr>
          <span class="zhb-title">免费资源与VIP资源界限设置</span>
          <div style="height: 15px;">&nbsp;&nbsp;</div>
          <el-form-item prop="vip_video_time">
            <template slot="label">
              视频时长 &lt;=  
              <el-popover ref="popover-video-time" placement="top-start" title="温馨提示" trigger="hover">
                • 取值范围3～60分钟；
                <br> • 可根据自身运营策略自由设定，侧重吸引VIP充值还是广告流量价值。
                <br>
              </el-popover>
            </template>
            <el-input v-model="settingFormAdmin.vip_video_time" style="width:80px;"></el-input>&nbsp;&nbsp;&nbsp;分钟则免费，超过该时长仅VIP会员可看
            <i class="el-icon-question icon-zhb" v-popover:popover-video-time></i>
          </el-form-item>
          <el-form-item prop="vip_book_length">
            <template slot="label">
              文章长度 &lt;=  
              <el-popover ref="popover-book-length" placement="top-start" title="温馨提示" trigger="hover" content="• 取值范围1000～10000。">
              </el-popover>
            </template>
            <el-input v-model="settingFormAdmin.vip_book_length" style="width:80px;"></el-input>&nbsp;&nbsp;&nbsp;字数则免费，超过该字数仅VIP会员可看
            <i class="el-icon-question icon-zhb" v-popover:popover-book-length></i>
          </el-form-item>
          <el-form-item prop="vip_pic_total">
            <template slot="label">
              每组图库 &lt;=  
              <el-popover ref="popover-pic-total" placement="top-start" title="温馨提示" trigger="hover" content="• 取值范围3～15。">
              </el-popover>
            </template>
            <el-input v-model="settingFormAdmin.vip_pic_total" style="width:80px;"></el-input>&nbsp;&nbsp;&nbsp;张图则免费，超过该图片数仅VIP会员可看
            <i class="el-icon-question icon-zhb" v-popover:popover-pic-total></i>
          </el-form-item>
          <hr>
          <span class="zhb-title">视频、图片、文学列表广告间隔设置</span>
          <div style="height: 15px;">&nbsp;&nbsp;</div>
          <el-form-item prop="ad_video">
            <template slot="label">
              视频列表中每隔
              <el-popover ref="popover-ad-video" placement="top-start" title="温馨提示" trigger="hover">
                • 取值范围3～15；
                <br> • 从已启用的通用插播广告中随机取一条展示，若无不展示。
                <br>
              </el-popover>
            </template>
            <el-input v-model="settingFormAdmin.ad_video" style="width:100px;"></el-input>&nbsp;&nbsp;&nbsp;项插播一条通用广告
            <i class="el-icon-question icon-zhb" v-popover:popover-ad-video></i>
          </el-form-item>
          <el-form-item prop="ad_book">
            <template slot="label">
              文学列表中每隔
              <el-popover ref="popover-ad-book" placement="top-start" title="温馨提示" trigger="hover">
                • 取值范围3～15；
                <br> • 从已启用的通用插播广告中随机取一条展示，若无不展示。
                <br>
              </el-popover>
            </template>
            <el-input v-model="settingFormAdmin.ad_book" style="width:100px;"></el-input>&nbsp;&nbsp;&nbsp;项插播一条通用广告
            <i class="el-icon-question icon-zhb" v-popover:popover-ad-book></i>
          </el-form-item>
          <el-form-item prop="ad_pic">
            <template slot="label">
              图库列表中每隔
              <el-popover ref="popover-ad-pic" placement="top-start" title="温馨提示" trigger="hover" content="ad book 必须是整数">
                • 取值范围3～15；
                <br> • 从已启用的通用插播广告中随机取一条展示，若无不展示。
                <br>
              </el-popover>
            </template>
            <el-input v-model="settingFormAdmin.ad_pic" style="width:100px;"></el-input>&nbsp;&nbsp;&nbsp;项插播一条通用广告
            <i class="el-icon-question icon-zhb" v-popover:popover-ad-pic></i>
          </el-form-item>
          <hr>
          <span class="zhb-title">虚拟播放量、查看量、阅读量设置</span>
          <br>
          <div style="display:inline-flex;margin-bottom:-18px;">
            <el-form-item prop="pv_video_base" style="width:400px">
              <template slot="label">
                视频虚拟播放量 =
                <el-popover ref="popover-video-base" placement="top-start" title="温馨提示" trigger="hover">
                  • 基数取值范围0～10000，倍数取值范围1～10；
                  <br> • 为了营造效果可适当设定，但是应注意取值太大显得不真实。
                  <br>
                </el-popover>
              </template>
              <el-input v-model="settingFormAdmin.pv_video_base"></el-input>
            </el-form-item>
            <el-form-item prop="pv_video_multiple" label="+" label-width="30px" style="width:400px">
              <el-input v-model="settingFormAdmin.pv_video_multiple" style="width:80px;"></el-input> * 实际播放量
              <i class="el-icon-question icon-zhb" v-popover:popover-video-base></i>
            </el-form-item>
          </div>
          <div style="display:inline-flex;margin-bottom:-18px;">
            <el-form-item prop="pv_book_base" style="width:400px">
              <template slot="label">
                文学虚拟阅读量 =
                <el-popover ref="popover-book-base" placement="top-start" title="温馨提示" trigger="hover">
                  • 基数取值范围0～5000，倍数取值范围1～10；
                  <br> • 为了营造效果可适当设定，但是应注意取值太大显得不真实。
                  <br>
                </el-popover>
              </template>
              <el-input v-model="settingFormAdmin.pv_book_base"></el-input>
            </el-form-item>
            <el-form-item prop="pv_book_multiple" style="width:400px" label="+" label-width="30px">
              <template slot="label">
                &nbsp;&nbsp;&nbsp;+
              </template>
              <el-input v-model="settingFormAdmin.pv_book_multiple" style="width:80px;"></el-input> * 实际阅读量
              <i class="el-icon-question icon-zhb" v-popover:popover-book-base></i>
            </el-form-item>
          </div>
          <div style="display:inline-flex">
            <el-form-item prop="pv_pic_base" style="width:400px">
              <template slot="label">
                图库虚拟查阅量 =
                <el-popover ref="popover-pic-base" placement="top-start" title="温馨提示" trigger="hover">
                  • 基数取值范围0～5000，倍数取值范围1～10；
                  <br> • 为了营造效果可适当设定，但是应注意取值太大显得不真实。
                  <br>
                </el-popover>
              </template>
              <el-input v-model="settingFormAdmin.pv_pic_base"></el-input>
            </el-form-item>
            <el-form-item prop="pv_pic_multiple" style="width:400px" label="+" label-width="30px">
              <template slot="label">
                &nbsp;&nbsp;&nbsp;+
              </template>
              <el-input v-model="settingFormAdmin.pv_pic_multiple" style="width:80px;"></el-input> * 实际查阅量
              <i class="el-icon-question icon-zhb" v-popover:popover-pic-base></i>
            </el-form-item>
          </div>
          <hr>
          <span class="zhb-title">
            会员充值价格设置
            <el-popover ref="popover-price" placement="top-start" title="温馨提示" trigger="hover">
              • 取值范围：10元  &lt;=   包月价格 &lt; 季度价格 &lt; 半年价格 &lt; 全年价格  &lt;=   800元；
              <br> • 可根据自身运营策略自由设定，侧重VIP充值收入还是广告流量变现；
              <br> • 合理的价格设定应该满足充值时间越长优惠力度越大；
              <br> • 考虑第三方支付成功率，价格设定不为整十或整百的倍数，注意最高价格应不超过你的第三方商户限额。
              <br>

            </el-popover>
            <i class="el-icon-question icon-zhb" v-popover:popover-price></i>
          </span>
          <div style="height: 15px;">&nbsp;&nbsp;</div>
          <el-form-item prop="price_month" label="月VIP价格">
            <el-input v-model="settingFormAdmin.price_month" style="width:80px"></el-input>&nbsp;&nbsp;&nbsp;元
          </el-form-item>
          <el-form-item prop="price_season" label="季度VIP价格">
            <el-input v-model="settingFormAdmin.price_season" style="width:80px"></el-input>&nbsp;&nbsp;&nbsp;元
          </el-form-item>
          <el-form-item prop="price_half" label="半年VIP价格">
            <el-input v-model="settingFormAdmin.price_half" style="width:80px"></el-input>&nbsp;&nbsp;&nbsp;元
          </el-form-item>
          <el-form-item prop="price_year" label="全年VIP价格">
            <el-input v-model="settingFormAdmin.price_year" style="width:80px"></el-input>&nbsp;&nbsp;&nbsp;元
          </el-form-item>
          <el-form-item label="操作">
            <!-- <el-button type="primary" @click="loadSetting">读取设置</el-button> -->
            <el-button type="primary" @click="updateSetting('settingFormAdmin')">保存设置</el-button>
            <!-- <el-button @click="resetForm('settingFormAdmin')">清空</el-button> -->
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
    loadSuperSetting,
    reloadVideo,
    reloadPic,
    reloadBook,
    reloadA1
  } from '@/api/setting'
  export default {
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    created() {
      if (this.name === 'admin') {
        this.loadSetting()
      } else {
        this.loadSetting()
        this.loadSuperSetting()
      }
    },
    data() {
      const pwdValidator = (rule, value, callback) => {
        value = value || ''
        if (value.length < 6 || value.length > 20) {
          callback(new Error('只能是6~20位字符'))
        } else {
          callback()
        }
      }
      const validator_reg_str = (rule, value, callback) => {
        value = value || ''
        if (!/^[a-zA-Z_\-0-9]+$/.test(value)) {
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
        if (!/^[a-zA-Z_\-0-9]+$/.test(value)) {
          callback(new Error('为空或者只能包含大小写字母和_'))
        } else {
          callback()
        }
      }
      const validator_reg_link = (rule, value, callback) => {
        value = value || ''
        if (!/^(http|https):\/\/[\s\S]*$/.test(value)) {
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
        if (!/^(http|https):\/\/[\s\S]*$/.test(value)) {
          callback(new Error('http:// 或 https://开头的网址'))
        } else {
          callback()
        }
      }
      const validator_reg_int = (rule, value, callback) => {
        value = value || ''
        if (!/^\d+$/.test(value)) {
          callback(new Error('只能输入整数'))
        } else {
          callback()
        }
      }
      const validator_reg_int_3_15 = (rule, value, callback) => {
        value = value || ''
        if (!/^\d+$/.test(value) || value < 3 || value > 15) {
          callback(new Error('只能是3~15整数'))
        }
        callback()
      }
      const validator_reg_int_0_10000 = (rule, value, callback) => {
        value = value || ''
        if (!/^\d+$/.test(value) || value < 0 || value > 10000) {
          callback(new Error('只能是0~10000整数'))
        }
        callback()
      }
      const validator_reg_int_5_5000 = (rule, value, callback) => {
        value = value || ''
        if (!/^\d+$/.test(value) || value < 0 || value > 5000) {
          callback(new Error('只能是0~5000整数'))
        }
        callback()
      }
      const validator_reg_int_1_10 = (rule, value, callback) => {
        value = value || ''
        if (!/^\d+$/.test(value) || value < 1 || value > 10) {
          callback(new Error('只能是1~10整数'))
        }
        callback()
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
        loading_a1: false,
        loading_video: false,
        loading_book: false,
        loading_pic: false,
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
          path_ad: '',
          paysapi_uid: '',
          paysapi_token: '',
          paysapi_expire: ''
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
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'blur'
          }
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
          vip_video_time: [{
            validator: validator_reg_int,
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              value = value || ''
              if (value < 3 || value > 60) {
                callback(new Error('只能是3~60分钟之内'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }],
          vip_book_length: [{
            validator: validator_reg_int,
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              value = value || ''
              if (value < 1000 || value > 10000) {
                callback(new Error('只能是1000~10000字之内'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }],
          vip_pic_total: [{
            validator: validator_reg_int,
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              value = value || ''
              if (value < 3 || value > 15) {
                callback(new Error('只能是3~15张之内'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }],
          ad_video: {
            validator: validator_reg_int_3_15,
            trigger: 'blur'
          },
          ad_book: {
            validator: validator_reg_int_3_15
          },
          ad_pic: {
            validator: validator_reg_int_3_15,
            trigger: 'blur'
          },
          pv_video_base: {
            validator: validator_reg_int_0_10000,
            trigger: 'blur'
          },
          pv_video_multiple: {
            validator: validator_reg_int_1_10,
            trigger: 'blur'
          },
          pv_book_base: {
            validator: validator_reg_int_5_5000,
            trigger: 'blur'
          },
          pv_book_multiple: {
            validator: validator_reg_int_1_10,
            trigger: 'blur'
          },
          pv_pic_base: {
            validator: validator_reg_int_5_5000,
            trigger: 'blur'
          },
          pv_pic_multiple: {
            validator: validator_reg_int_1_10,
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
          oldpwd: {
            validator: pwdValidator
          },
          newpwd: {
            validator: pwdValidator
          },
          renewpwd: {
            validator: pwdValidator
          }
        },
        rulesForModifyPwdFormForSuperAdmin: {
          oldpwd: {
            validator: pwdValidator
          },
          newpwd: {
            validator: pwdValidator
          },
          renewpwd: {
            validator: pwdValidator
          }
        },
        rulesForresetAdminPwdForm: {
          newpwd: {
            validator: pwdValidator
          },
          renewpwd: {
            validator: pwdValidator
          }
        }
      }
    },
    methods: {
      handleChange(val) {
        // const v = parseInt(val[0])
        // switch (v) {
        //   case 2: {
        //     this.loadSuperSetting()
        //     break
        //   } case 5: {
        //     this.loadSetting()
        //     break
        //   } default:break
        // }
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
          const a = parseInt(this.settingFormAdmin.price_month)
          const b = parseInt(this.settingFormAdmin.price_season)
          const c = parseInt(this.settingFormAdmin.price_half)
          const d = parseInt(this.settingFormAdmin.price_year)
          if (!(a >= 10 && b > a && c > b && d > c && d <= 800)) {
            this.$alert('会员价格必须符合取值范围：10元 <= 包月价格 < 季度价格 < 半年价格 < 全年价格<=800元', '温馨提示', {
              confirmButtonText: '确定',
              type: 'error'
            })
          } else {
            this.settingFormAdmin.guest_mode = this.guestModeSwitch ? '1' : '0'
            updateSetting(this.settingFormAdmin).then(response => {
              this.$alert('已保存！', '温馨提示', {
                type: 'success'
              })
            })
          }
        })
      },
      updateSuperSetting(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false
          }
          updateSuperSetting(this.settingFormSuper).then(response => {
            this.$alert('已保存！', '温馨提示', {
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
      },
      reload_video() {
        this.loading_video = true
        reloadVideo().then(r => {
          this.loading_video = false
          this.$alert('刷新视频成功！', '温馨提示', {
            type: 'success'
          })
        }).catch(() => {
          this.loading_video = false
        })
      },
      reload_book() {
        this.loading_book = true
        reloadBook().then(r => {
          this.loading_book = false
          this.$alert('刷新文学成功！', '温馨提示', {
            type: 'success'
          })
        }).catch(() => {
          this.loading_book = false
        })
      },
      reload_pic() {
        this.loading_pic = true
        reloadPic().then(r => {
          this.loading_pic = false
          this.$alert('刷新图库成功！', '温馨提示', {
            type: 'success'
          })
        }).catch(() => {
          this.loading_pic = false
        })
      },
      reload_a1() {
        this.loading_a1 = true
        reloadA1().then(r => {
          this.loading_a1 = false
          this.$alert('刷新A1成功！', '温馨提示', {
            type: 'success'
          })
        }).catch(() => {
          this.loading_a1 = false
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

  .zhb-title {
    padding: 5px;
    margin-bottom: 5px;
    font-weight: 700;
    background: #e0dcdc;
  }

  .zhb-haha {
    position: absolute;
    margin-top: 2px;
    margin-left: 10px;
  }

  hr {
    border: solid 0.5px #c5c4c4;
  }

</style>
