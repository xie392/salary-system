import request from "../utils/request"

// 登录
export const getSalaryInfo = (params: LoginParams): Promise<any> => {
  return request({
    url: "/salary/list",
    method: "get",
    params
  })
}

