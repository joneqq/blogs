const express = require('express');
const MongoControl = require('./static/packagDB').MongoControl;
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cookieParser = require('cookie-parser');
const page = new MongoControl('blog', 'page');
const comment = new MongoControl('blog', 'comment');
const ejs = require('ejs');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId
const moment = require('moment')

// 读取静态目录
app.use('/',express.static('./static'))
app.use(cookieParser())
//后台程序相关     发送静态目录
app.use('/admin' , express.static('./static'))
// 路由分发
app.use('/admin' , require('./admin'))

//前台程序相关
// 找出所有文章
app.get('/', function (req, res) {
    page.find({}, function (err, mongoData) {
        ejs.renderFile('./ejs-tpl/home.ejs', { data: mongoData }, function (err, result) {
            res.send(result)
        })
    })
})

// 找出文章内容
app.get('/page', function (req, res) {
    var id = req.query.id;
    page.find({
        _id: ObjectId(id)
    }, function (err, mongoData) {
        comment.find({
            fromid: id,//哪篇文章的评论
            state : 1  //评论的状态
        }, function (err, mongoData2) {
    
            ejs.renderFile('./ejs-tpl/page.ejs', { data: mongoData[0],comment : mongoData2 }, function (err, result) {
               // console.log(result)
                res.send(result)
            })
        })

    })
})

// 评论接口
app.post('/submitComment' , urlencodedParser  ,function(req,res){
    var id = req.query.id;
    var formTitle = req.query.page;
    var content = req.body.content;
    comment.insert({
        fromid : id,
        content : content,
        date : moment().format('YYYY-MM-DD'),
        state : 0,
        formTitle : formTitle
    },function(err,data){
        // 重定向
        res.redirect(
            "/page?id=" + id
        )
    })
})


app.listen(4000)