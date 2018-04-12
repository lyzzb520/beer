import { request } from '@/utils/request'

const query = (params) => {
  return request({
    url: 'content/query/book',
    method: 'post',
    params
  })
}

export { query }

