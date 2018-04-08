import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, getName } from '@/utils/auth' // 验权

const whiteList = ['/login', '/super'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  const tk = getToken()
  if (tk) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      // console.log('拉取用户信息')
      if (tk === 'admin') {
        if (store.getters.roles.length === 0) {
          store.dispatch('GetInfo').then(res => { // 拉取用户信息
            if (res.code !== 0) {
              store.dispatch('FedLogOut').then(() => {
                Message({
                  message: '验证失败, 请重新登录',
                  type: 'error',
                  duration: 3 * 1000
                })
                next({ path: '/login' })
              })
            }
            next()
          }).catch(() => {
            store.dispatch('FedLogOut').then(() => {
              Message({
                message: '验证失败, 请重新登录',
                type: 'error',
                duration: 3 * 1000
              })
              next({ path: '/login' })
            })
          })
        } else {
          next()
        }
      } else if (tk === 'superadmin') {
        if (store.getters.roles.length === 0) {
          store.dispatch('GetSuperInfo').then(res => { // 拉取超级用户信息
            if (res.code !== 0) {
              store.dispatch('FedSuperLogOut').then(() => {
                Message({
                  message: '验证失败, 请重新登录',
                  type: 'error',
                  duration: 3 * 1000
                })
                next({ path: '/super' })
              })
            }
            next()
          }).catch(() => {
            store.dispatch('FedSuperLogOut').then(() => {
              Message({
                message: '超管验证失败, 请重新登录',
                type: 'error',
                duration: 3 * 1000
              })
              next({ path: '/super' })
            })
          })
        } else {
          next()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      const n = getName() || ''
      if (n === 'admin' || n === '') {
        next('/login')
      } else {
        next('/super')
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
