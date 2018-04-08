import { request } from '@/utils/request'

export const query = (data) => {
  return request({
    url: 'order/query',
    method: 'post',
    data
  })
}

