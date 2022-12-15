const express = require("express");
const router = express.Router();

const attendance = require("../../Controller/attendance");

// 获取员工考勤信息
router.get("/attendance/info", attendance.getAttendanceInfo)

// 修改考勤信息
router.post("/attendance/edit", attendance.editAttendanceInfo)


module.exports = router;