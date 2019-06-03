const express = require('express')
//创建服务器
const app = express()
//使接口有解析post的功能
var bodyParser = require('body-parser')
//导路径包
const path = require('path')
//导数据
const db = require(path.join(__dirname, 'utils', 'db.js'))
//导可以传文件的包
const multer = require('multer')
//用户上传的文件保存在这里
const upload = multer({
    dest: 'uploads/'
})

//静态托管，将html页面暴露出去，成为可访问
app.use(express.static('public'))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

//注册路由  用户登录  有参数  post
app.post('/login', (req, res) => {
    //获取请求参数
    const {
        username,
        password
    } = req.body
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


//注册路由  获取英雄列表，无参数  get  
app.get('/list', (req, res) => {
    //导入已经写好的数据，调用db的getheros方法
    const data = db.getHeros()
    res.send({
        msg: '获取成功',
        code: 200,
        data
    })
})

//注册路由  新增英雄信息，有参数（icon,name,skill） post  formData
app.post('/add', upload.single('icon'), (req, res) => {
    console.log(req.flie);

    const icon = req.file.path
    const {
        name,
        skill
    } = req.body
    if (db.addHero({
            name,
            skill,
            icon
        })) {
        res.send({
            msg: "新增成功",
            code: 200
        })
    } else {
        res.send({
            msg: "参数错误",
            code: 400
        })
    }

})


//注册路由  删除英雄信息，有参数 id get
app.get('/delete', (req, res) => {
    const id = req.query.id
    if (db.deleteHeroById(id)) {
        res.send({
            msg: '删除成功',
            code: 200
        })
    } else {
        res.send({
            msg: '删除失败',
            code: 200
        })
    }

})

//注册路由  根据id查找英雄，有参数id get
app.get('/search', (req, res) => {
    const id = req.query.id
    const data = db.getHeroById(id)
    console.log(data);

    if (data) {
        res.send({
            msg: '查找成功',
            code: 200,
            data,
        })
    } else {
        res.send({
            msg: '查找失败',
            code: 400

        })
    }
})


//注册路由 编辑英雄信息 有参数 id post
app.post('/edit', upload.single('icon'), (req, res) => {
    // req.file的path属性里放着icon图片的地址
    const icon = req.file.path
    const {
        name,
        skill,
        id
    } = req.body
    if (db.editHero({
            id,
            name,
            skill,
            icon
        })) {
        res.send({
            msg: "修改成功",
            code: 200
        })
    } else {
        res.send({
            msg: "参数错误",
            code: 400
        })
    }

})

//开启监听
app.listen(3000, () => console.log('success'))