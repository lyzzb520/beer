import { request } from '@/utils/request'

export const query = (data) => {
  return request({
    url: 'order/query',
    method: 'post',
    data
  })
}
export const query2 = (data) => {
  return request({
    url: 'paysapi/query',
    method: 'post',
    data
  })
}

