const { getSalaryList } = require("../Model/salary")

// 获取薪资
exports.getSalaryInfo = (req, res) => {
  try {
    let { page, limit } = req.query

    if (!page || !limit) {
      page = 1, limit = 15
    }

    page = parseInt(page)
    limit = parseInt(limit)

    getSalaryList({ page: (page - 1) * limit, limit }, data => {
      res.jsonSuccess({
        data: data?.map(v => {
          const baseMoney =  Number(((v.ebase_money / v.total_day) * v.work_day).toFixed(2));
          const jobMoney =  Number(((v.jbase_money / v.total_day) * v.work_day).toFixed(2));
          const performMoney =  Number((v.perform_money * (v.score / 100) + (Number(v.jlevel) - 1) * v.grow_money).toFixed(2));
          const liveMoney =  Number(((v.live_money / v.total_day) * v.work_day).toFixed(2));
          const overMoney =  Number(((v.ebase_money / v.total_day) * v.over_day).toFixed(2));
          const pieceMoney = Number(((v.ebase_money / v.total_day) * v.piece_total).toFixed(2));
          const totalMoney = Number((baseMoney + jobMoney + performMoney + liveMoney + overMoney + pieceMoney).toFixed(2));
          return {
            uid: v.eid,
            name: v.ename,
            // ebase_money: v.ebase_money,
            // jbase_money: v.jbase_money,
            // perform_money: v.perform_money,
            // live_money: v.live_money,
            // grow_money: v.grow_money,
            // work_day: v.work_day,
            // total_day: v.total_day,
            // over_day: v.over_day,
            // piece_total: v.piece_total,
            // jlevel: v.jlevel,
            // score: v.score,
            baseMoney,
            jobMoney,
            performMoney,
            liveMoney,
            overMoney,
            pieceMoney,
            totalMoney
          }
        }
        ),
        page,
        limit,
        total: 10,
      })
    })

  }
  catch (err) {
    console.log("获取考勤信息失败", err);
    res.jsonFail(400, "获取失败")
  }
}