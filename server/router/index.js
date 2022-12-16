const express = require("express");
const router = express.Router();
const middleware = require('../Middleware/index')
const errorCode = require('../utils/error-code')

router.get('/',(req,res)=>{
  res.send("hello world")
})

// 全局响应 Response 
router.use((req, res, next) => {

  res.jsonSuccess = data => {
    res.json({
      code: 200,
      data,
      message: 'success',

    })
  }

  res.jsonFail = (code, message) => {
    res.json({
      code,
      msg: message || errorCode[code],
    })
  }

  next()
})

// 全局拦截
router.all('/*', middleware);

// 模块管理接口
router.use(require('./module/user'))
router.use(require('./module/employees'))
router.use(require('./module/department'))
router.use(require('./module/attendance'))
router.use(require('./module/salary'))

module.exports = router;