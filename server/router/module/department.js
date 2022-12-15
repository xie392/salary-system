const express = require("express");
const router = express.Router();

const department = require("../../Controller/department");


// 获取岗位信息
router.get("/department/info", department.getDepartmentInfo)

// 获取岗位信息
router.get("/jobs/info",department.getJobsInfo)

// 添加岗位
router.post("/jobs/add",department.addJobsInfo)

// 修改
router.post("/jobs/edit",department.editJobsInfo)

// 删除
router.post("/jobs/del",department.delJobsInfo)

module.exports = router;