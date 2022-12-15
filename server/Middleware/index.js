const { verToken } = require('../utils/token')
const errorCode = require('../utils/error-code')

// 全局拦截器
const whiteList = ['/captcha', '/captcha/validate', '/login']

const Middleware = (req, res, next) => {

  if (whiteList.includes(req._parsedUrl.pathname)) return next()

  let token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.jsonFail(401, "请先登录")
  } else {
    if (verToken(token) === null) {
      return res.jsonFail(401)
    }
    return next()
  }

  return ress.jsonFail(404)

};

module.exports = Middleware;
