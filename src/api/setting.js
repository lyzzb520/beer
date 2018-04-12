import {
  request,
  SUPER_PRE
} from '@/utils/request'

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
const reloadVideo = () => {
  return request({
    url: 'content/reload/video',
    method: 'get'
  })
}
const reloadPic = () => {
  return request({
    url: 'content/reload/pic',
    method: 'get'
  })
}
const reloadBook = () => {
  return request({
    url: 'content/reload/book',
    method: 'get'
  })
}
const reloadA1 = () => {
  return request({
    url: 'content/reload/a1',
    method: 'get'
  })
}
export {
  modifyPwd,
  modifySuperPwd,
  resetBAdminPwd,
  updateSetting,
  updateSuperSetting,
  loadSetting,
  loadSuperSetting,
  reloadVideo,
  reloadPic,
  reloadBook,
  reloadA1
}
