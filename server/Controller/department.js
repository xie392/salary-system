const { getDepartment, getJobs, addJobs, editJobs, deltJobs } = require("../Model/department")
const { createRandomId } = require("../utils/randomId")

// 部门基本信息
exports.getDepartmentInfo = (req, res) => {
  getDepartment(data => {
    if (data.length === 0) {
      return res.jsonFail(400, "获取失败")
    }
    const list = data.map(v => ({ did: v.jid, name: v.jname }))
    res.jsonSuccess(list);
  })
}

// 岗位管理
exports.getJobsInfo = (req, res) => {
  try {

    let { page, limit } = req.query;

    if (!page || !limit) {
      page = 1, limit = 15
    }

    page = parseInt(page)
    limit = parseInt(limit)

    getJobs({ page: (page - 1) * limit, limit }, data => {
      if (data) {
        data.data = data.data.map(v => ({
          id: v.jid,
          role: v.jname,
          grades: v.level_total,
          ebase_money: v.ebase_money,
          jbase_money: v.jbase_money,
          perform_money: v.perform_money,
          live_money: v.live_money,
          grow_money: v.grow_money,
        }))
        res.jsonSuccess(data);
      }
      else {
        res.jsonFail(400, "获取错误")
      }
    })

  } catch (error) {
    res.jsonFail(400, '获取失败');
  }
}

// 添加岗位
exports.addJobsInfo = (req, res) => {
  try {
    let { role: name, grades: level_total, ebase_money, jbase_money, perform_money, live_money, grow_money } = req.body;

    if (!name || !level_total || !ebase_money || !jbase_money || !perform_money || !live_money || !grow_money) {
      return res.jsonFail(400, '参数错误')
    }

    addJobs({ id: createRandomId(), name, level_total, ebase_money, jbase_money, perform_money, live_money, grow_money }, data => {
      if (data) {
        res.jsonSuccess(data)
      } else {
        res.jsonFail(400, '添加岗位失败')
      }
    })

  } catch (error) {
    console.log("erro", error);
    res.jsonFail(400, '添加失败');
  }
}

// 修改岗位
exports.editJobsInfo = (req, res) => {
  try {
    let { id, role: name, grades: level_total, ebase_money, jbase_money, perform_money, live_money, grow_money } = req.body;

    if (!id || !name || !level_total || !ebase_money || !jbase_money || !perform_money || !live_money || !grow_money) {
      return res.jsonFail(400, '参数错误')
    }

    editJobs({ id, name, level_total, ebase_money, jbase_money, perform_money, live_money, grow_money }, data => {
      if (data) {
        res.jsonSuccess(null)
      } else {
        res.jsonFail(400)
      }
    })

  } catch (error) {
    console.log("erro", error);
    res.jsonFail(400, '修改失败');
  }
}

// 删除岗位
exports.delJobsInfo = (req, res) => {
  try {
    const { id } = req.body;
    deltJobs(id, data => {
      if (data.affectedRows > 0) {
        res.jsonSuccess(null)
      } else {
        res.jsonFail(400, '修改送失败')
      }
    })

  } catch (error) {
    console.log("erro", error);
    res.jsonFail(400, '修改失败');
  }
}