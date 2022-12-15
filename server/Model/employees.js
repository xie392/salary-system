const DB = require("../utils/db");
const { verToken } = require('../utils/token')

// 获取员工信息
exports.getEmployeesList = ({ page, limit }, callback) => {
  // let uid = verToken(token)?.uid;
  let list = {};
  DB.exec({
    sql: `select employees.*,jobs.jname 
          from employees,jobs 
          where employees.jid = jobs.jid and employees.isshow = 1 
          order by ecreate_time desc limit ?,?;`,
    params: [page, limit],
    callback: data => {
      if (data.length !== 0) {
        list.data = data;
        DB.exec({
          sql: `select count(*) as total from employees where isshow = 1 `,
          params: [],
          callback: res => {
            list.total = res || 0;
            callback(list)
          }
        })
      } else {
        callback({ data: [], total: 0 })
      }

    }
  })
}

// 添加员工
exports.addEmployeesInfo = (info, callback) => {
  const { uid, birth, grades, role, createTime, name, gender, phone, } = info;
  DB.exec({
    sql: `insert into 
          employees(eid,jid,jlevel,ename,ebirth,egender,ephone,ecreate_time) 
          values (?,?,?,?,?,?,?,?)`,
    params: [uid, role, grades, name, birth, gender, phone, createTime],
    callback: data => {
      if (data) {
        addAttendance({ eid: uid, work_day: 0, total_day: 26, over_day: 0, piece_total: 0, score: 0 })
      }
      callback(data)
    }
  })
}

// 添加考勤记录
const addAttendance = ({ eid, work_day, total_day, over_day, piece_total, score }, callback) => {
  DB.exec({
    sql: `insert into attendance(eid,work_day,total_day,over_day,piece_total,score) values (?,?,?,?,?,?)`,
    params: [eid, work_day, total_day, over_day, piece_total, score],
    callback: () => { }
  })
}

// 修改员工信息
exports.editEmployeesInfo = (info, callback) => {
  const { role, grades, name, birth, gender, phone, uid } = info;
  DB.exec({
    sql: `update employees set jid = ?,jlevel = ?, ename = ?,ebirth = ?, egender = ?, ephone = ? where eid = ?`,
    params: [role, grades, name, birth, gender, phone, uid],
    callback
  })
}

// 删除
exports.delEmployeesInfo = ({ uid }, callback) => {
  DB.exec({
    sql: `update employees set isshow = 0 where eid = ?`,
    params: [uid],
    callback: data => {
      del(uid)
      callback(data)
    }
  })
}

// 删除考勤表内信息
const del = (uid, callback) => {
  DB.exec({
    sql: `update attendance set isshow = 0 where eid = ?`,
    params: [uid],
    callback: () => { }
  })
}