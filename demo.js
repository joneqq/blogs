// 路由分发
// 不同人做的文件合并共享
// 例：demo.js和admin.js
const express = require('express');
const app = express(); 

// 用admin文件处理/admin请求
app.use('/admin' , require('./admin'));

app.get('/' , function(req,res){
    res.send('index')
})

app.listen(3001)