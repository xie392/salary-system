#  软件工程实验五编码之小明服装厂工资管理系统

> 一个好用的工资管理系统应该计算所得工资是每个月 -5000+ 才对。
> 🧡公司：公司供你上班机会，还免费给用电，每个月-5000好像也没毛病。
> 💔员工：听我说，谢谢你，因为有你……

首先在此声明一下这个系统所用技术：🧡后台： node + express + mysql  🧡前台：react@8.2.0，如果不合适你的技术要求，你可以不用往下看了，如果不限制编码所用语言，可以来参考一下。简明一下，这个作业就是我这个菜鸡练练手用的，真有点拿不出手的感觉💢，不过为了帮助一些被作业所困扰的同学，我还是拿出来献丑了㊙。下面我来介绍一下我写的内容：

#  目录介绍
1、后台目录
```js
┌─config             
│  └─ config.js		   连接数据库的配置文章，可在此输入相关配置
│─Controller            
│  └─ attendance.js     考勤管理(控制器)
│  └─ department.js     岗位管理(控制器)
│  └─ employees.js      员工管理(控制器)
│  └─ salary.js         工资管理(控制器)
│  └─ user.js           用户管理(控制器)
├─db                    
│  └─ db.sql            数据库文件       
├─Middleware              
│  └─ index.js          全局中间件(拦截一些错误信息)    
├─Model            
│  └─ attendance.js     考勤管理(模型)
│  └─ department.js     岗位管理(模型)
│  └─ employees.js      员工管理(模型)
│  └─ salary.js         工资管理(模型)
│  └─ user.js           用户管理(模型)
├─router       
│  └─module       
│  │  └─ attendance.js  考勤管理接口管理
│  │  └─ department.js  岗位管理接口管理
│  │  └─ employees.js   员工管理接口管理
│  │  └─ salary.js      工资管理接口管理
│  │  └─ user.js        用户管理接口管理     
│  └─ index.js          接口路由管理 
├─utils     
│  └─ crypto.js         加密方法
│  └─ db.js             连接数据库的方法
│  └─ error-code.js     错误码
│  └─ randomId.js       随机id生成
│  └─ token.js          jwt生成和验证
├─ app.js               启动文件
```

简洁的目录🔰，我也是第一次写node，对一些业务逻辑不是很清楚，只会简单的curd (前端：后端不就是curd嘛，有什么难的；后端：💢，你行你上)

2、前台目录
前台目录有点多，我这里不深入写了，自己克隆再自己看看吧💨，我这里列一些关键目录
```js
┌─public            
│─src           
│  └─ api               接口管理
│  └─ assets            静态资源目录
│  └─ component         组件
│  └─ hooks             自定义 hooks 
│  └─ router            路由管理
│  └─ store             状态管理
│  └─ type              ts类型管理
│  └─ views             视图
│  └─ App.tsx           主页面  
│  └─ main.tsx          程序入口页面
│  └─ permission.tsx    路由白名单配置
├─ .env.development     开放环境的基本配置                    
├─ .env.production      生产环境的基本配置           
```
react就是个菜鸡，能写这点已经很不错了，第一个node和react我写得有点拉跨💔，凑合用吧💢

# 数据流图建模并编写相应的数据字典
1、数据流图
[顶层图](./images/1.png)

