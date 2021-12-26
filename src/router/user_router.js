const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const { create } = require('../controller/user_control')
const { verifyUser, handlePassword } = require('../middleware/user_middleware')

router.post('/', verifyUser, handlePassword, create)
module.exports = router