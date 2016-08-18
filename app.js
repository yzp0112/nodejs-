var express = require('express')

var bodyParser = require('body-parser');
var app = express()

////引入arttemplate模板
var template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('views', ('./views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//因为路由地址是由上往下进行寻址的
//如果我的public中存在index.html 
//我的路由默认会直接打开此文件
//把某一个文件夹映射为服务器静态文件目录,此目录中的内容可以直接访问
//此文件夹下面一般存放静态资源文件(静态html、图片、css、客户端js等等)
//关于静态文件夹的名字不一定非要叫public
//在一个应用程序中可以指定多个静态资源文件
//如果public和www中存在相同名字的文件,那么按照路由从上往下的顺序查找(找到后就跳出)
//静态目录中可以创建二级目录
app.use(express.static('./public'))
app.use(express.static('./www'))

/*
此路由的地址应该是 http://localhost:3000/
但是 如果public文件夹下面有index.html 那么此路由无效
*/
app.get('/',(req,res)=>{
    res.send('这里是访问的 / 地址')
})

/****
 * 此路由访问的地址是 http://localhost:3000/public/list
 */
app.get('/public/list',(req,res)=>{
    res.send('这里访问的是 /public/list 地址');
})

/***
 * http://localhost:3000/public/editor
 * http://localhost:3000/public/editor/abc
 */
app.get('/public/editor/:id?',(req,res)=>{
    res.send('这里访问的是 /public/editor/'+req.params.id+' 地址');
})

/****
 * 管理后台登陆的路由必须防置在登录权限判断路由之前
 */
app.get('/admin/login',(req,res)=>{
    res.send('这个位置填写登陆页面相关的路由信息')
})

/**
 * 我所有的路由地址,只要是以/admin/ 开头的,都会经过这个路由做跳转
 */
app.all('/admin/*',(req,res,next)=>{
    console.log('这里访问的是/admin/* 相关的路由,即路由地址中包含/admin的')
    /*
    *if(没有登陆)
    *   跳转到登陆页面
    *else
    *   next()
    */
    next();
})

/****
 * 在访问此路由地址的时候 会首先经过上面一个 
 * app.all('/admin/*' ) 这个方法的处理
 */
app.get('/admin/main',(req,res)=>{
    res.send('这里访问的是 /admin/main 地址')
})


/////这个是通过引入模块的方式加入新的路由地址
//在访问的时候 首先在浏览器中输入的地址为模块的别名(即app.use中的第一个参数)
//  然后输入js文件中的对应的路由名
app.use('/animal',require('./routes/first'))
app.use('/family',require('./routes/first'))
app.use('/tom/jerry',require('./routes/first'))
app.use('/admin/animal',require('./routes/first'))


app.listen(3000,function(){
    console.log('服务器运行中.....')
})