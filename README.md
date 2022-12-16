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

# 薪资计算方式

工资构成：基本工资+岗位工资+绩效工资/计件工资+生活津贴+加班工资。

基本薪资表：
| 职位  | 月基本工资 | 月岗位工资 | 月绩效工资 | 月生活津贴 | 岗位增幅 |
|--|--|--|--|--|--|
| 厂长 | 800 | 800 | 300 | 100 | 500 |

考勤表：
| 全勤  | 出勤 | 加班天数 | 计件数 | 绩效得分 | 岗位等级 |
|--|--|--|--|--|--|
| 26 | 24 | 5 | 0 | 80 | 2 |

1、基本工资： 800 ÷ 26 × 24 = 738.46 (保留两位小数)
2、岗位工资： 800 ÷ 26 × 24 = 738.46 (保留两位小数)
3、绩效工资： 300 × 80% = 240 + (2 - 1) × 500 = 740  (岗位等级 - 1) * 岗位增幅
4、生活津贴： 100 ÷ 26 × 24 =  92.31(保留两位小数)
5、加班工资： 800 ÷ 26 × 5 = 153.85 (保留两位小数)

总工资：738.46 + 738.46 + 740 + 92.31 + 153.83 = 2463.06

最终小明厂长的工资位两千多块！老板都这么点，员工每人-5000才能让小明开上法拉利啊，员工小小的肩膀扛起了老板的远大理想……

# 运行教程

> 后台运行教程请看[教程](/server/README.md)
> 前台运行教程请看[教程](/web/README.md)

# 收获
首先是前台的收获
## 1、react-router-dom v6 的使用
v6与之前的版本有所不同，先比之前的版本，v6的路由配置更为简洁一些，一开始，我就难倒在了路由注册和路由守卫这里，因为它不像vue有个路由守卫，得自己写得，百度到得配置是v6之前的💔，不过最终还是被我在B站找到了一个新的的react教程，边看边敲下，最终也理解并写出来了

## 2、react hooks 的使用
其实就是自己自定义好的方法，方便在其它页面的复用，这个hooks确实强大，里面所有表格内自带的搜索都是有自定义hooks实现的，大大减少了代码冗余，属于是误打误撞吧，稀里糊涂的写出了💦

## 3、redux 的使用
类似于vuex的状态管理工具，虽然在这个项目中实际应用，但是我还是写了，主要是为了熟悉吧，状态可以共享，但是刷新会丢失，这个问题需要装插件或自己监听刷新前把数据存进localStorage里面去，我用了redux-persist插件，但并未达到我想要的效果，数据刷新还是会丢失，这个现在属于这个项目的遗留问题了💠

后台收获
## 后端业务初步熟悉
后台做了全局中间件拦截，虽然写得有点捞，只能写一些基本的curd操作，其实之前是用nest写的后端，但是遇到了解决不了的问题才转回用express来写💢，还是等我关注的博主更新 nest 教程再做过一个新的项目吧……

# 总结
学习永无止境，不要被一点点小小的问题所止步于此，做自己喜欢做的事，开发自己想要开发的程序。

# 项目截图
就简单的几个页面，不要太较真我能写出什么牛逼的东西💨
![1](/images/1.png)
![2](/images/2.png)
![3](/images/3.png)
![4](/images/4.png)
![5](/images/5.png)
![6](/images/6.png)
![7](/images/7.png)
![9](/images/9.png)

网上有很多后台ui框架，但是我这么并没有使用那些，主要是为了让自己熟悉一些react，如果你也有兴趣，那么不妨耐心学习一下吧





