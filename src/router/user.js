const router=require('koa-router')();
const User=require('../controllers/user');

router.prefix('/api');

router.post('/register',User.register);
router.post('/login',User.login);

router.get('/',(ctx,next)=>{
    ctx.body='this is users res'
})
router.get('/userList',User.getUersList)


module.exports=router;