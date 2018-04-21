import { request } from '@/utils/request'

const query = (data) => {
  return request({
    url: 'applog/query',
    method: 'post',
    data
  })
}

export { query }

