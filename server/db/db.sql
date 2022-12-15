// 生成员工数据
// {
//   "did": "123",
//   "bmmc": "财务部",
//   "bmfzr": "马云",
//   "bmrs": "2",
//   "fzrdh": "17878012053",
//   "bmdz": "综合楼三楼",
//   "cjsj": "2000-10-02",
//   "isshow": "1"
// },
let list = {
  "RECORDS": []
}
Array.from({ length: 20 }, (v) => {
  list['RECORDS'].push({
    "uid": `${v+1}`,
    "did": "1",
    "uname": `test${v}`,
    "upwd": "e10adc3949ba59abbe56e057f20f883ee10adc",
    "ygnl": "22",
    "ygxb": "男",
    "ygdh": "电话",
    "yhkh": "银行卡号",
    "ygyx": "邮箱",
    "ygdz": "地址",
    "ygsr": "生日",
    "ygsfz": "身份证",
    "ygzw": "职务",
    "rzsj": "入职时间",
    "gwdj": "岗位等级",
    "bz": "备注",
    "isshow": "1",
    "yggh": "48359549605465"
  })
})

console.log(list);