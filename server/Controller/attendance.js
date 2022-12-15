const { getAttendance, editAttendance } = require("../Model/attendance")

// 考勤基本信息
exports.getAttendanceInfo = (req, res) => {
  try {

    let { page, limit } = req.query

    if (!page || !limit) {
      page = 1, limit = 15
    }

    page = parseInt(page)
    limit = parseInt(limit)

    getAttendance({ page: (page - 1) * limit, limit }, data => {
      if (!data?.data) {
        return res.jsonFail(400, "获取失败")
      }
      const list = data?.data.map(v => ({
        uid: v.eid,
        work_day: v.work_day,
        total_day: v.total_day,
        over_day: v.over_day,
        piece_total: v.piece_total,
        score: v.score,
        name: v.ename
      }))
      res.jsonSuccess({ data: list, page, limit, total: data?.total[0]?.total || 0 });
    })
  }
  catch (err) {
    console.log("获取考勤信息失败", err);
    res.jsonFail(400, "获取失败")
  }
}

// 修改考勤信息
exports.editAttendanceInfo = (req, res) => {
  try {
    let { work_day, total_day, over_day, piece_total, score, uid } = req.body;

    let flag = true;

    for (const key in req.body) {
      if (!['work_day', 'total_day', 'over_day', 'piece_total', 'score', 'uid'].includes(key)) {
        flag = false;
      }
    }

    if (!flag) {
      return res.jsonFail(400, '参数错误')
    }

    editAttendance({ work_day, total_day, over_day, piece_total, score: score || 0, uid }, data => {
      if (data && data.affectedRows > 0) {
        res.jsonSuccess(null);
      } else {
        res.jsonFail(400, "修改失败")
      }
    })
  }
  catch (err) {
    console.log("修改考勤信息失败", err);
    res.jsonFail(400, "修改失败")
  }
}