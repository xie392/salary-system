const express = require("express");
const router = express.Router();

const salary = require("../../Controller/salary");

// 获取员工信息
router.get("/salary/list", salary.getSalaryInfo)


module.exports = router