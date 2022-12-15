import request from "../utils/request"

// 登录
export const getLogin = (data: LoginParams): Promise<LoginInterface> => request({ url: `/login`, data, method: 'post' })

// 获取用户信息
export const getUserInfo = (params: { page: number, limit: number }): Promise<any> => {
  return request({
    url: `/user/info`,
    method: 'get',
    params
  })
}

// 添加用户
export const addUserInfo = (data): Promise<any> => {
  return request({
    url: `/user/add`,
    method: 'post',
    data
  })
}

// 删除
export const delUserInfo = (data: { uid: string }): Promise<null> => {
  return request({
    url: `/user/del`,
    method: 'post',
    data
  })
}

// 修改
export const editUserInfo = (data:any): Promise<null> => {
  return request({
    url: `/user/edit`,
    method: 'post',
    data
  })
}

// 修改密码
export const editUserPwd = (data:any): Promise<null> => {
  return request({
    url: `/user/pwd`,
    method: 'post',
    data
  })
}