import { request } from '@/utils/request'

const query = (data) => {
  return request({
    url: 'user/query',
    method: 'post',
    data
  })
}
const queryLogin = (data) => {
  return request({
    url: 'user/queryLogin',
    method: 'post',
    data
  })
}
const update = (params) => {
  return request({
    url: 'user/update',
    method: 'post',
    params
  })
}
const count = () => {
  return request({
    url: 'user/count',
    method: 'get'
  })
}
export { query, update, queryLogin, count }

