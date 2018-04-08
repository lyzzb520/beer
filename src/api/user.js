import { request } from '@/utils/request'

const query = (data) => {
  return request({
    url: 'user/query',
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
export { query, update }
