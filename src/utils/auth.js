import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const Admin = 'Admin'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setName(name) {
  return Cookies.set(Admin, name)
}
export function getName() {
  return Cookies.get(Admin)
}
