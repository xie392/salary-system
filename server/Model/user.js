const DB = require("../utils/db");

// 登录
exports.getLogin = ({ uname, upwd }, callback) => {
  DB.exec({
    sql: `select p_add,p_edit,p_delect,p_read,uname,id from admin 
          where uname = ? and upwd = ? and admin.isshow = 1`,
    params: [uname, upwd],
    callback,
  })
}

// 获取用户信息
exports.getUser = ({ page, limit, uid }, callback) => {
  let list = {};
  DB.exec({
    sql: `select id,uname,upwd,p_add,p_edit,p_delect,p_read from admin where id != ? and isshow = 1 limit ?,?`,
    params: [uid, page, limit],
    callback: data => {
      list.data = data;
      userTotal(uid, res => {
        list.total = res[0]?.total || 0;
        if (res) {
          callback(list)
        } else {
          callback(null)
        }
      })
    }
  })
}

// 获取总数
const userTotal = (uid, callback) => {
  DB.exec({
    sql: `select count(*) as total from admin where id != ? and isshow = 1`,
    params: [uid],
    callback,
  })
}

// 获取用户信息
exports.addUser = ({ uid, name, pwd, b, w, d, r }, callback) => {
  let list = {};
  DB.exec({
    sql: `insert into admin(id,uname,upwd,p_add,p_edit,p_delect,p_read) values(?,?,?,?,?,?,?)`,
    params: [uid, name, pwd, b, w, d, r],
    callback
  })
}

// 判断有无该用户
exports.isUser = (name, callback) => {
  let list = {};
  DB.exec({
    sql: `select uname from admin where uname = ? and isshow = 1`,
    params: [name],
    callback: data => {
      if (data.length === 0) {
        callback(true)
      } else {
        callback(false)
      }
    }
  })
}

// 删除用户
exports.delUser = (uid, callback) => {
  DB.exec({
    sql: `update admin set isshow = 0 where id = ?`,
    params: [uid],
    callback
  })
}

// 修改用户
exports.editUser = ({ name, pwd, b, d, r, w, id }, callback) => {
  DB.exec({
    sql: `update admin set 
          uname = ?,upwd = ?, p_add = ?, p_edit = ? ,p_delect = ?, p_read = ? 
          where id = ? and isshow = 1`,
    params: [name, pwd, b, w, d, r, id],
    callback
  })
}

// 修改密码
exports.updatePwd = ({ pwd, id }, callback) => {
  isPwd(id, data => {
    if (data?.[0]?.upwd !== pwd) {
      DB.exec({
        sql: `update admin set upwd = ? where id = ? and isshow = 1`,
        params: [pwd, id],
        callback
      })
    }
    else {
      callback(null)
    }
  })
}

// 查询密码是否和原来一样
const isPwd = (id, callback) => {
  DB.exec({
    sql: `select upwd from admin where id = ? and isshow = 1`,
    params: [id],
    callback
  })
}

