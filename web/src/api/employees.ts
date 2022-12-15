import request from "../utils/request"

// 员工列表
export const getEmployeesList = (params: { page: number, limit: number }): Promise<EmployeesApi> => {
  return request({
    url: '/employees/list',
    method: 'get',
    params
  })
}

// 添加员工
export const addEmployeesInfo = (data: addEmployeesInfoData): Promise<addEmployeesInfo> => {
  return request({
    url: '/employees/add',
    method: 'post',
    data
  })
}

// 修改员工信息
export const editEmployeesInfo = (data: addEmployeesInfoData): Promise<addEmployeesInfo> => {
  return request({
    url: '/employees/update',
    method: 'post',
    data
  })
}

// 删除员工
export const delEmployeesInfo = (data: delEmployeesInfoData): Promise<addEmployeesInfo> => {
  return request({
    url: '/employees/delete',
    method: 'post',
    data
  })
}





