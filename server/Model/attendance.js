const DB = require("../utils/db");

// 获取考勤信息
exports.getAttendance = ({ page, limit }, callback) => {
  let list = {};
  DB.exec({
    sql: `select attendance.*,employees.ename 
          from attendance,employees 
          where attendance.eid = employees.eid and attendance.isshow = 1 limit ?,?`,
    params: [page, limit],
    callback: data => {
      if (data) {
        list.data = data;
        setTotal(total => {
          list.total = total;
          callback(list);
        })
      } else {
        callback(list)
      }
    }
  })
}

const setTotal = (callback) => {
  DB.exec({
    sql: `select count(*) as total from attendance where isshow = 1`,
    params: [],
    callback
  })
}

// 修改考勤信息
exports.editAttendance = ({ work_day, total_day, over_day, piece_total, score, uid }, callback) => {
  let list = {};
  DB.exec({
    sql: `update attendance set work_day = ?,total_day = ?,over_day = ?,piece_total = ?, score = ? where eid = ?`,
    params: [work_day, total_day, over_day, piece_total, score, uid],
    callback
  })
}