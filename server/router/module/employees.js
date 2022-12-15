const express = require("express");
const router = express.Router();

const employees = require("../../Controller/employees");


// 获取员工信息
router.get("/employees/list", employees.EmployeesList)

// 添加员工
router.post("/employees/add", employees.addEmployees)

// 修改员工信息
router.post("/employees/update",employees.updateEmployees)

// 删除员工
router.post("/employees/delete",employees.delEmployees)

module.exports = router;