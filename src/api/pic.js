import { request } from '@/utils/request'

const query = (params) => {
  return request({
    url: 'content/query/pic',
    method: 'post',
    params
  })
}
export { query }

