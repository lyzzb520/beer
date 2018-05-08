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
export const updateOperstatus = (params) => {
  return request({
    url: 'paysapi/updateOperstatus',
    method: 'post',
    params
  })
}
export const check = (params) => {
  return request({
    url: 'paysapi/check',
    method: 'post',
    params
  })
}

