//各种通用工具类
const { md5 } = require("./crypto");

//生成永不重复的id
exports.createRandomId = function () {
    return new Date().getTime().toString()
    // return new Date().getFullYear().toString() +
    //     (Math.ceil(Math.random() * 10000000 + 10000000)).toString().substring(0, 5)
    // return md5(
    //     (Math.random() * 10000000).toString(16).substring(0, 4)
    //     + '-' +
    //     (new Date()).getTime()
    //     + '-' +
    //     Math.random().toString().substring(2, 5)
    // ).toString()
}

// const createRandom = function () {
//     return new Date().getTime().toString()
// }

// console.log("createRandomId",createRandom());


exports.formatDate = function (date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var min = date.getMinutes();
    var s = date.getSeconds();
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hours, min, s].map(formatNumber).join(":");
}

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}

