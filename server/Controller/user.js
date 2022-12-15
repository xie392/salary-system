const svgCaptcha = require("svg-captcha")
const { getLogin, getUser, addUser, isUser, delUser, editUser, updatePwd } = require("../Model/user")
const { setToken, verToken } = require('../utils/token');
const { createRandomId } = require("../utils/randomId")
const { md5 } = require('../utils/crypto');
const { response } = require("express");

// 生成验证码
exports.captcha = (req, res) => {
  const createCaptcha = svgCaptcha.create({
    size: 4,
    fontSize: 50,
    width: 100,
    height: 40,
    background: '#f1f1f1',
  });
  req.session.code = createCaptcha.text;
  console.log("获取验证码后赋值", req.session);
  res.type('image/svg+xml');
  res.send(createCaptcha.data);
}

// 验证验证码
exports.captchaValidate = (req, res) => {
  console.log("验证验证码", req); // undefined
  res.jsonSuccess(null)
}

exports.login = (req, res) => {

  let { uname, upwd } = req.body;

  if (!uname || !upwd) {
    res.jsonFail(400, "参数错误");
    return;
  }

  getLogin({ uname, upwd: md5(upwd) }, data => {

    if (data.length === 0) {
      res.jsonFail(400, "账号或密码错误")
      return;
    }

    let list = {
      creator: {
        uid: data[0].id,
        name: data[0].uname,
        b: data[0].p_add,
        w: data[0].p_edit,
        d: data[0].p_delect,
        r: data[0].p_read,
      },
      token: setToken({ uname, uid: data[0].id })
    }

    return res.jsonSuccess(list)

  })

}

exports.getUserInfo = (req, res) => {
  try {

    let { page, limit } = req.query

    if (!page || !limit) {
      page = 1, limit = 15
    }

    page = parseInt(page)
    limit = parseInt(limit)

    const { uid } = verToken(req.headers.authorization?.split(' ')[1])

    if (!uid) return res.jsonFail(400, '非法用户')

    getUser({ page: (page - 1) * limit, limit, uid }, data => {
      if (data) {
        res.jsonSuccess({
          data: data.data.map(v => ({
            name: v.uname,
            b: v.p_add,
            r: v.p_read,
            d: v.p_delect,
            w: v.p_edit,
            id: v.id,
            pwd: v.upwd
          })),
          page,
          limit,
          total: data.total
        })
      } else {
        res.jsonFail(400, '获取失败')
      }
    })

  }
  catch (err) {
    console.log("erro", err);
    res.jsonFail(400, '修改失败');
  }
}

exports.addUserInfo = (req, res) => {
  try {

    let { name, r, d, b, w, pwd } = req.body;

    if (!name || !pwd) {
      return res.jsonFail(400, '参数错误')
    }

    if (pwd.length > 16) {
      return res.jsonFail(400, '密码长度最多为16位')
    }

    if (!r) r = 0;
    if (!d) d = 0;
    if (!b) b = 0;
    if (!w) w = 0;

    isUser(name, data => {
      if (data) {
        addUser({ uid: createRandomId(), name, pwd: md5(pwd), r, d, b, w }, data => {
          if (data.affectedRows > 0) {
            res.jsonSuccess(null)
          } else {
            res.jsonFail(400, '添加失败')
          }
        })
      }
    })
  }
  catch (err) {
    console.log("erro", err);
    res.jsonFail(400, '添加失败');
  }
}

// 删除用户
exports.delUserInfo = (req, res) => {
  try {
    if (!req.body.uid) {
      return res.jsonFail(400, '参数错误')
    }

    delUser(req.body.uid, data => {
      if (data.affectedRows > 0) {
        res.jsonSuccess(null)
      } else {
        res.jsonFail((400, '删除失败'))
      }
    })
  }
  catch (err) {
    console.log("erro", err);
    res.jsonFail(400, '删除失败');
  }
}

// 修改用户
exports.editUserInfo = (req, res) => {
  try {

    let { name, r, d, b, w, pwd, id } = req.body;

    if (!name || !pwd || !id) {
      return res.jsonFail(400, '参数错误')
    }

    if (!r) r = 0;
    if (!d) d = 0;
    if (!b) b = 0;
    if (!w) w = 0;

    editUser({ name, pwd: pwd.length > 16 ? md5(pwd) : pwd, b, d, r, w, id }, data => {
      if (data?.affectedRows > 0) {
        res.jsonSuccess(null)
      } else {
        res.jsonFail((400, '修改失败'))
      }
    })
  }
  catch (err) {
    console.log("erro", err);
    res.jsonFail(400, '修改失败');
  }
}

// 修改密码
exports.editUserPwd = (req, res) => {
  try {
    let { pwd, pwd1, pwd2, uid } = req.body;

    if (!pwd || !pwd1 || !pwd2 || !uid) {
      return res.jsonFail(400, '参数错误')
    }

    pwd = md5(pwd);
    pwd1 = md5(pwd1);
    pwd2 = md5(pwd2);

    updatePwd({ pwd: pwd1, id: uid }, data => {
      if (data?.affectedRows > 0) {
        res.jsonSuccess(null)
      } else {
        res.jsonFail(400, '修改失败，请检查是否输入正确')
      }
    })
  }
  catch (err) {
    console.log("erro", err);
    res.jsonFail(400, '修改失败');
  }
}




