const DB = require("../utils/db")

// 登录
exports.getSalaryList = ({ page, limit }, callback) => {
  DB.exec({
    sql: `select jlevel,ename,ebase_money,jbase_money,perform_money,live_money,grow_money,attendance.* 
          from employees,salary,attendance 
          where employees.jid = salary.jid and employees.eid = attendance.eid  and salary.isshow = 1
          order by employees.eid 
          limit ?,?`,
    params: [page, limit],
    callback,
  })
}

