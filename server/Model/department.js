const DB = require("../utils/db");

// 获取岗位信息
exports.getDepartment = (callback) => {
  DB.exec({
    sql: `select jid,jname,level_total from jobs where isshow = 1`,
    params: [],
    callback
  })
}


// 获取岗位信息和基本薪资
exports.getJobs = ({ page, limit }, callback) => {
  let list = {}
  DB.exec({
    sql: `select jname,level_total,salary.* 
          from jobs,salary where  jobs.jid = salary.jid  and jobs.isshow = 1
          order by jid desc limit ?,?`,
    params: [page, limit],
    callback: data => {
      if (data) {
        list.data = data;
        total(total => {
          list.total = total;
          list.page = page + 1;
          list.limit = limit;
          callback(list)
        })
      } else {
        callback(null)
      }
    }
  })
}

const total = (callback) => {
  DB.exec({
    sql: `select count(*) as total from salary where isshow = 1 `,
    params: [],
    callback: res => callback(res[0]?.total || 0)
  })
}

// 添加岗位
exports.addJobs = (info, callback) => {
  const { id, name, level_total, ebase_money, jbase_money, perform_money, live_money, grow_money } = info;
  DB.exec({
    sql: `insert into jobs(jid,jname,level_total) values(?,?,?)`,
    params: [id, name, level_total],
    callback: data => {
      if (data.affectedRows > 0) {
        addSalary({ jid: id, ebase_money, jbase_money, perform_money, live_money, grow_money }, res => {
          callback(true)
        })
      } else {
        callback(null)
      }

    }
  })
}

const addSalary = ({ jid, ebase_money, jbase_money, perform_money, live_money, grow_money }, callback) => {
  DB.exec({
    sql: `insert into salary(jid,ebase_money,jbase_money,perform_money,live_money,grow_money) 
          values(?,?,?,?,?,?)`,
    params: [jid, ebase_money, jbase_money, perform_money, live_money, grow_money],
    callback
  })
}

// 修改岗位
exports.editJobs = (info, callback) => {
  const { id, name, level_total, ebase_money, jbase_money, perform_money, live_money, grow_money } = info;
  DB.exec({
    sql: `update salary set 
          ebase_money = ?,jbase_money = ?, perform_money = ?,live_money = ?, grow_money = ?   
          where jid = ?`,
    params: [ebase_money, jbase_money, perform_money, live_money, grow_money, id],
    callback: data => {
      if (data.affectedRows > 0) {
        edit({ name, level_total, id, }, res => {
          callback(true)
        })
      } else {
        callback(null)
      }
    }
  })
}

const edit = ({ name, level_total, id }, callback) => {
  DB.exec({
    sql: `update jobs set jname = ?,level_total = ? where jid = ? and isshow = 1`,
    params: [name, level_total, id],
    callback
  })
}

// 删除
exports.deltJobs = (id, callback) => {
  DB.exec({
    sql: `update jobs,salary set jobs.isshow = 0, salary.isshow = 0 where jobs.jid = salary.jid and  jobs.jid  = ?`,
    params: [id],
    callback
  })
}
