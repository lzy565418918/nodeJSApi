const express = require('express')
//创建服务器
const app = express()
//使接口有解析post的功能
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//注册路由
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
//开启监听
app.listen(3000, () => console.log('success'))
