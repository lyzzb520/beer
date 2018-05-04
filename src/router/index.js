import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/super', component: () => import('@/views/super/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '后台首页', icon: 'home' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Setting',
        component: () => import('@/views/setting/index'),
        meta: { title: '系统设置', icon: 'setting' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home/index',
    name: 'Index',
    hidden: true
  },

  {
    path: '/content',
    component: Layout,
    redirect: '/content/video',
    name: 'Resource',
    meta: { title: '资源管理', icon: 'resource' },
    children: [
      {
        path: 'video',
        name: 'Video',
        component: () => import('@/views/video/index'),
        meta: { title: '视频资源', icon: 'video' }
      },
      {
        path: 'pic',
        name: 'Pic',
        component: () => import('@/views/pic/index'),
        meta: { title: '图库资源', icon: 'pic' }
      },
      {
        path: 'book',
        name: 'Book',
        component: () => import('@/views/book/index'),
        meta: { title: '文学资源', icon: 'doc' }
      }
    ]
  },
  {
    path: '/userinfo',
    redirect: '/userinfo/user',
    name: 'Userinfo',
    component: Layout,
    meta: { title: '用户管理', icon: 'resource' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户信息', icon: 'user' }
      },
      {
        path: 'userlogin',
        name: 'Userlogin',
        component: () => import('@/views/userlogin/index'),
        meta: { title: '登录日志', icon: 'foot' }
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('@/views/feedback/index'),
        meta: { title: '留言反馈', icon: 'feedback' }
      }
    ]
  },
  {
    path: '/app',
    component: Layout,
    children: [
      {
        path: 'app',
        name: 'App',
        component: () => import('@/views/app/index'),
        meta: { title: 'APP统计', icon: 'app' }
      }
    ]
  },
  {
    path: '/app',
    component: Layout,
    children: [
      {
        path: 'ad',
        name: 'Ad',
        component: () => import('@/views/ad/index'),
        meta: { title: '广告位管理', icon: 'ad' }
      }
    ]
  },
  /*
  {
    path: '/pay3',
    redirect: '/pay3/order',
    name: 'Pay3',
    component: Layout,
    meta: { title: '第三方支付', icon: 'resource' },
    children: [
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/order/index'),
        meta: { title: '充值订单', icon: 'order' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户信息', icon: 'user' }
      }
    ]
  },
  */
  {
    path: '/pay1',
    redirect: '/pay1/user',
    name: 'Pay1',
    component: Layout,
    meta: { title: '个人支付', icon: 'resource' },
    children: [
      {
        path: 'setting1',
        name: 'Setting1',
        component: () => import('@/views/setting1/index'),
        meta: { title: '收款设置', icon: 'setting' }
      },
      {
        path: 'order1',
        name: 'Order1',
        component: () => import('@/views/order1/index'),
        meta: { title: '充值订单', icon: 'order' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

