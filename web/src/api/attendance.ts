import request from "../utils/request"

// 获取考核信息
export const getAttendanceInfo = (params: { page: number, limit: number }): Promise<AttendanceApi> => {
  return request({
    url: '/attendance/info',
    method: 'get',
    params
  })
}

// 修改考核信息
export const editAttendanceInfo = (data:editAttendanceInfoApi): Promise<editAttendanceInfoApi> => {
  return request({
    url: '/attendance/edit',
    method: 'post',
    data
  })
}
