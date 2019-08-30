// 个人页面
const express = require('express');
const routor = express.Router() //功能和app一样  路由分发
const moment = require('moment');
const MongoControl = require('./static/packagDB').MongoControl;
const urlencodedParser = require('body-parser').urlencoded({extended :false})
const page = new MongoControl('blog', 'page');
const path = require('path');
const cookieParser = require('cookie-parser')
const token = 'ahsjdkayuhfiasyfiu&8sdfashjk';
const comment = new MongoControl('blog', 'comment');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId

//引入cookie管理模块
const CookieControl = require('./cookie');
var  admin = new CookieControl()

//   '/'相当于/admin    (/admin/...)
routor.get('/' , function(req,res){
      if(admin.checkToken(req.cookies.token)){
          res.sendFile(path.resolve('./static/admin.html'))
      }
      else{
          res.redirect('/admin/login')
      }
})

routor.get('/login' , function(req,res){
    res.sendFile(path.resolve('./static/login.html'))
})

routor.post('/login' , urlencodedParser , function(req,res){
    if(req.body.username == 'admin' && req.body.password == '123456'){
        res.cookie('token' , admin.getToken())
        //转到个人页
        res.redirect('/admin')
    }
    else{
        res.status(403).send('登陆失败')
    }
})

// 插入文章
routor.post('/uploadPage' ,urlencodedParser, function(req,res){
    if(admin.checkToken(req.cookies.token)){
 
    }
    else{
        res.status(403).send('你没有权限');
        return
    }
      var author = req.body.author;
      var title = req.body.title;
      var content = req.body.content;
      var intor = req.body.intor;
      var now = moment().format('YYYY-MM-DD');
      page.insert({
          title : title,
          date : now ,
          content : content,
          intor : intor,
          author : author
      },function(err,data){
          res.send('成功')
      })
})

// 审核评论接口
routor.get('/getComment' , function(req,res){
    comment.find({state : 0} , function(err,data){
        if(data.length == 0){
            res.send([])
        }
        res.send(data)
    })
})

routor.get('/passComment' , function(req,res){
    var id = req.query.id;
    comment.update({
        _id : ObjectId(id)
    },{
        state : 1
    },function(err,result){
        
    })
})

routor.get('/nopassComment' , function(req,res){
    var id = req.query.id;
    comment.update({
        _id : ObjectId(id)
    },{
        state : 2
    },function(err,result){
        //res.send('ok')
    })
})


module.exports = routor;   //整体引出
//exprots.routor = routor;  //变成app.use('/admin' , require('./admin').routor);