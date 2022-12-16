
本人node版本为 v16.17.0，npm 版本为 7.6.3
#  1、添加数据库
把 db 目录下的 db.sql 添加到数据库，这里用的是 Navicat Premium
![附加sql](/images/add_sql.png)

# 2、配置文件
打开 config 目录下的 config.js,配置你自己的参数
![配置文件](/images/config.png)

# 3、安装依赖
```shell
npm install
```

# 4、启动服务
```shell
node app.js
```

访问 http://127.0.0.1:3000 出现 "hello world" 就说明运行成功了