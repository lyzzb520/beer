import axios from 'axios'
import { Message } from 'element-ui'
// import store from '../store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000// 请求超时时间
})
const SUPER_PRE = '60ae9feb-2436-414e-bdbe-77e4a9e9f60e/'
// request拦截器
service.interceptors.request.use(config => {
  /*
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  */
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非0是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code !== 0) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 20000) {
        window.location.href = '#/404'
      } else {
        Message({
          message: res.msg,
          type: 'error',
          showClose: true,
          duration: 3 * 1000
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export { service as request, SUPER_PRE }
// export default service
