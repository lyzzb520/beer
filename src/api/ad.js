import { request } from '@/utils/request'

const query = (data) => {
  return request({
    url: 'ad/query',
    method: 'post',
    data
  })
}
const del = (params) => {
  return request({
    url: 'ad/del',
    method: 'post',
    params
  })
}
const update = (params) => {
  return request({
    url: 'ad/update',
    method: 'post',
    params
  })
}
const upload = (data) => {
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: 'ad/add',
    method: 'post',
    data
  })
}
export { query, del, update, upload }

