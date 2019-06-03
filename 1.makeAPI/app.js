const express = require('express')
//创建服务器
const app = express()
//使接口有解析post的功能
var bodyParser = require('body-parser')
//导路径包
const path = require('path')
//导数据
const db = require(path.join(__dirname,'utils','db.js'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//注册路由  用户登录  有参数  post
app.post('/login', (req, res) => {
    //获取请求参数
    const { username, password } = req.body
    //判断请求的用户名和密码，正确就返回成功，错误就返回失败
    if (username == 'admin' && password == '123456') {
        res.send({
            msg: '登录成功',
            code: 200
        })
    } else {
        res.send({
            msg: '用户名或密码错误',
            code: 400
            
        })
    }
})


//获取英雄列表，无参数  get  
app.get('/list', (req, res) => {
    //导入已经写好的数据，调用db的getheros方法
    const data = db.getHeros()
    res.send({
        msg: '获取成功',
        code: 200,
        data
    })
})


//开启监听
app.listen(3000, () => console.log('success'))
