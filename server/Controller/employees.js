const svgCaptcha = require("svg-captcha")
const { getEmployeesList, addEmployeesInfo, editEmployeesInfo, delEmployeesInfo } = require("../Model/employees")
const { createRandomId, formatDate } = require("../utils/randomId")

// 查看员工信息
exports.EmployeesList = (req, res) => {

  let { page, limit } = req.query

  if (!page || !limit) {
    page = 1, limit = 15
  }

  page = parseInt(page)
  limit = parseInt(limit)

  try {
    getEmployeesList({ page: (page - 1) * limit, limit }, data => {

      if (!data) {
        return res.jsonFail(400, "获取失败")
      }

      const arr = data?.data.map(v => ({
        // 员工工号
        uid: v.eid,
        // 部门id
        did: v.jid,
        // 员工姓名
        name: v.ename,
        // 年龄
        age: new Date().getFullYear() - new Date(v.ebirth).getFullYear(),
        // 性别
        gender: v.egender,
        // 手机号
        phone: v.ephone,
        // 生日
        birth: v.ebirth,
        // 入职时间
        createTime: v.ecreate_time,
        // 等级
        grades: v.jlevel,
        // 任职
        role: v.jname
      }))

      const list = {
        data: arr || [],
        page,
        limit,
        total: data?.total[0]?.total ?? 0,
      }
      res.jsonSuccess(list)
    })
  }
  catch (err) {
    console.log("捕获错误");
    res.jsonFail(400, err);
  }
}

// 添加员工
exports.addEmployees = (req, res) => {

  // const { birth, name, gender, phone, role, grades } = req.body;

  // if (!birth || !name || !gender || !phone || !role || !grades) {
  //   return res.jsonFail(400, "参数错误")
  // }

  const valid = valided(req.body);

  if (!valid.flag) {
    return res.jsonFail(400, valid.msg)
  }

  // 验证姓名
  // const namePattern = /^[a-zA-Z0-9_-]{4,16}$/;
  // if (!namePattern.test(name)) {
  //   return res.jsonFail(400, "姓名不符合规范")
  // }

  // // 验证性别
  // if(!['男','女'].includes(gender)) {
  //   return res.jsonFail(400, "性别不符合规范")
  // }

  // // 验证手机号
  // if(!/^1[356789]\d{9}$|^147\d{8}$|^176\d{8}$/g.test(phone)) {
  //   return res.jsonFail(400, "手机号不符合规范")
  // }

  // 

  addEmployeesInfo({ uid: createRandomId(), ...req.body, createTime: formatDate(new Date()) }, data => {

    try {
      if (!data) {
        return res.jsonFail(400, "请检查添加内容是否符合规范")
      }

      res.jsonSuccess(null)

    }
    catch (err) {
      console.log("添加员工失败" + err);
      return res.jsonFail(400, "未知错误")
    }
  })
}

// 修改员工信息
exports.updateEmployees = (req, res) => {

  const valid = valided(req.body);

  if (!valid.flag || !req.body.uid) {
    return res.jsonFail(400, valid.msg || "参数错误")
  }

  editEmployeesInfo({ ...req.body }, data => {
    try {
      if (!data) {
        return res.jsonFail(400, "请检查修改内容是否符合规范")
      }

      res.jsonSuccess(null)

    }
    catch (err) {
      console.log("修改员工失败" + err);
      return res.jsonFail(400, "未知错误")
    }
  })

}

// 验证
const valided = (body) => {
  const { birth, name, gender, phone, role, grades } = body;

  if (!birth || !name || !gender || !phone || !role || !grades) {
    return { flag: false, msg: "参数错误" }
  }

  return { flag: true, msg: "" }
}

// 删除员工
exports.delEmployees = (req, res) => {
  try {
    if (!req.body.uid) {
      return res.jsonFail(400, "参数错误");
    }

    delEmployeesInfo({ uid: req.body.uid }, data => {
      if (!data) {
        return res.jsonFail(400, '删除失败')
      }
      res.jsonSuccess(null);
    })
  }
  catch (err) {
    res.jsonFail(400, "删除失败");
  }
}