var express = require('express');
var router = express.Router();


router.get('/cat',(req,res)=>{
    // res.send('这里的访问值./routes/first.js中的"/cat"地址的路由')
    res.render('cat',{name:"加菲猫"})
})

router.get('/a/dog',(req,res)=>{
    res.render('animal/dog',{name:"旺财"})
})

module.exports = router;
