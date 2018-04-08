import { request, SUPER_PRE } from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(data) {
  return request({
    url: 'admin/info',
    method: 'get',
    data
  })
}
export function logout() {
  return request({
    url: 'admin/logout',
    method: 'post'
  })
}
export function superLogin(username, password) {
  return request({
    url: SUPER_PRE + 'login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
export function getSuperInfo(data) {
  return request({
    url: SUPER_PRE + 'info',
    method: 'get',
    data
  })
}
export function superLogout() {
  return request({
    url: SUPER_PRE + 'logout',
    method: 'post'
  })
}
