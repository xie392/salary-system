const mysql = require("mysql");
const config = require("../config/config");

module.exports = {

    config,

    connection: null,

    // 建立数据库连接
    openConn() {
        this.connection = mysql.createConnection(this.config);
    },

    /**
     * 请求数据库操作
     * @param {*} config  {sql:`sql语法`,params:[参数],callback} 
     */
    exec(config) {
        this.openConn(); //请求连接

        // 第一步 请求数据库连接
        this.connection.commit()


        // 第二步 操作数据库 增删改查
        this.connection.query(config.sql, config.params, function (error, result) {
            try {
                if (error) {
                    console.log("数据库操作错误", error.message);
                    // 错误是返回
                    config.callback(null);
                    // return error.message;
                } else {
                    config.callback(result);
                }
            } catch (error) {
                console.log("数据库操作错误 ===>", error.message);
                // 错误是返回
                config.callback(null);
            }
        })

        // 第三步 关闭数据库
        this.connection.end((err) => {
            this.connection = null; //清空对象
        });
    }
}