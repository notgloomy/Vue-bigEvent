// 与用户有关的接口都从这里构建
import request from '@/utils/request.js'
// 注册接口
export const requserReg = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}
// 登录接口
export const requserLogin = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}
// 获取用户信息
export const requserInfo = () => {
  return request.get('/my/userinfo')
}
// 更新用户信息
export const updateUserInfo = ({ id, nickname, email }) => {
  return request.put('/my/userinfo', { id, nickname, email })
}

// 更新用户头像
export const updateUserAvatar = (avatar) => {
  return request.patch('/my/update/avatar', { avatar })
}

// 更新用户密码
export const updateUserPas = ({ old_pwd, new_pwd, re_pwd }) => {
  return request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
}
