//用于生成和解析token
var jwt = require('jsonwebtoken');
var signkey = 'xiaomingfuzhuangchangxinziguanlixitong';//密钥AE对称加过密

//设置token
exports.setToken = (params, expiresIn = '24h') => jwt.sign(params, signkey, { expiresIn });


//验证token
exports.verToken = function (token) {

  let resolve = null;

  jwt.verify(token, signkey, (err, data) => { resolve = data || null })

  return resolve;
}
