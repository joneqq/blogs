const MongoControl = require('./static/packagDB').MongoControl;
const page = new MongoControl('blog' , 'page');
const comment = new MongoControl('blog' , 'comment');
const moment = require('moment')

// page.insert({
//     title : '海绵宝宝恶作剧',
//     sort : '日常生活',
//     author : '派大星',
//     date : moment().format('YYYY-MM-DD'),
//     content : '海绵宝宝给章鱼哥吃了掺有蟹老板**的蟹黄包，反胃了，拉了一天肚子',
//     intor : '章鱼哥吃坏东西了',
// },
// function(){

// })

// comment.insert({
//     fromid : '5c6adab81a72291ce4fe217f',
//     content : '哈哈哈，这一集我也看过',
//     date : moment().format('YYYY-MM-DD')
// },function(err,data){

// })

// page.find({},function(err,data){
//     console.log(data)
// },()=>{})
// comment.find({} , function(err,data){
//     console.log(data)
// },()=>{})

page.remove({},function(){

})

comment.remove({},function(){

})