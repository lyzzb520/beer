import { request } from '@/utils/request'

const query = (data) => {
  return request({
    url: 'pic/query',
    method: 'post',
    data
  })
}
const del = (params) => {
  return request({
    url: 'pic/del',
    method: 'post',
    params
  })
}
const update = (data) => {
  return request({
    url: 'pic/update',
    method: 'post',
    data
  })
}
const upload = (data) => {
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: 'pic/upload',
    method: 'post',
    data
  })
}
export { query, del, update, upload }

