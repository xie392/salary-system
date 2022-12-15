import request from "../utils/request"

// 岗位信息
export const getDepartmentInfo = (): Promise<EmployeesApi> => {
  return request({
    url: '/department/info',
    method: 'get',
  })
}

// 获取岗位信息
export const getJobsInfo = (params: { page: number, limit: number }): Promise<addJobsInfoData> => {
  return request({
    url: '/jobs/info',
    method: 'get',
    params
  })
}

// 添加岗位信息
export const addJobsInfo = (data: addJobsInfoData): Promise<null> => {
  return request({
    url: '/jobs/add',
    method: 'post',
    data
  })
}


// 修改岗位信息
export const editJobsInfo = (data: addJobsInfoData): Promise<null> => {
  return request({
    url: '/jobs/edit',
    method: 'post',
    data
  })
}

// 删除岗位
export const delJobsInfo = (data: { id: string }): Promise<null> => {
  return request({
    url: '/jobs/del',
    method: 'post',
    data
  })
}
