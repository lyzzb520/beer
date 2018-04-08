import { request } from '@/utils/request'

export const query = (data) => {
  return request({
    url: 'feedback/query',
    method: 'post',
    data
  })
}
export const update = (params) => {
  return request({
    url: 'feedback/update',
    method: 'post',
    params
  })
}
