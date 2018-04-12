import { request } from '@/utils/request'

const query = (params) => {
  return request({
    url: 'content/query/notice',
    method: 'post',
    params
  })
}

export { query }

