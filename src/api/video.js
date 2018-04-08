import { request } from '@/utils/request'

const query = (data) => {
  return request({
    url: 'video/query',
    method: 'post',
    data
  })
}
const del = (params) => {
  return request({
    url: 'video/del',
    method: 'post',
    params
  })
}
const update = (data) => {
  return request({
    url: 'video/update',
    method: 'post',
    data
  })
}
const upload = (data) => {
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: 'video/upload',
    method: 'post',
    data
  })
}
export { query, del, update, upload }

