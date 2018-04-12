import { request } from '@/utils/request'

const query = (params) => {
  return request({
    url: 'content/query/video',
    method: 'post',
    params
  })
}
const del = (params) => {
  return request({
    url: 'content/del/video',
    method: 'post',
    params
  })
}
const update = (params) => {
  return request({
    url: 'content/edit/video',
    method: 'post',
    params
  })
}
export { query, del, update }

