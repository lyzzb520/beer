import { request } from '@/utils/request'

const query = (data) => {
  return request({
    url: 'merchant/query',
    method: 'post',
    data
  })
}
const del = (params) => {
  return request({
    url: 'merchant/del',
    method: 'post',
    params
  })
}
const update = (params) => {
  return request({
    url: 'merchant/update',
    method: 'post',
    params
  })
}
const add = (data) => {
  return request({
    url: 'merchant/add',
    method: 'post',
    data
  })
}
export { query, del, update, add }

