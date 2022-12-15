const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require("cookie-parser")

// 允许跨域
app.use(cors());

// post请求配置
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// 静态资源访问
app.use('/static', express.static(path.join(__dirname, 'public')));

// app.use(session({ secret: 'token',name:'_token_', resave: false, saveUninitialized: true, cookie: {maxAge: 1800000}, }))
// app.use(session({ secret: 'is_token', name: '_token_', resave: false, saveUninitialized: true, cookie: { maxAge: 1800000 }, }));

// 后台Api
app.use('/api', require("./router/index"));


const port = 3000;
app.listen(port, () => {
  console.log(`服务器开启成功:http://127.0.0.1:${port}`)
})


