const express = require("express");
const router = express.Router();

const user = require("../../Controller/user");


// // 获取验证码
// router.get('/captcha', user.captcha)

// // 验证验证码
// router.post('/captcha/validate', user.captchaValidate)

// 登录
router.post("/login", user.login)

// 获取用户信息
router.get("/user/info",user.getUserInfo)

// 添加用户
router.post("/user/add",user.addUserInfo)

// 删除用户
router.post("/user/del",user.delUserInfo)

// 修改用户
router.post("/user/edit",user.editUserInfo)

// 修改密码
router.post("/user/pwd",user.editUserPwd)

module.exports = router;