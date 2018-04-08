import { request, SUPER_PRE } from '@/utils/request'

const modifyPwd = (data) => {
  return request({
    url: 'setting/modifyPwd',
    method: 'post',
    data
  })
}
const modifySuperPwd = (data) => {
  return request({
    url: SUPER_PRE + 'modifySuperPwd',
    method: 'post',
    data
  })
}
const updateSetting = (data) => {
  return request({
    url: 'setting/updateSetting',
    method: 'post',
    data
  })
}
const loadSetting = () => {
  return request({
    url: 'setting/loadSetting',
    method: 'get'
  })
}
const loadSuperSetting = () => {
  return request({
    url: SUPER_PRE + 'loadSuperSetting',
    method: 'get'
  })
}
const updateSuperSetting = (data) => {
  return request({
    url: SUPER_PRE + 'updateSuperSetting',
    method: 'post',
    data
  })
}
const resetBAdminPwd = (data) => {
  return request({
    url: SUPER_PRE + 'resetBAdminPwd',
    method: 'post',
    data
  })
}
export { modifyPwd, modifySuperPwd, resetBAdminPwd, updateSetting, updateSuperSetting, loadSetting, loadSuperSetting }

