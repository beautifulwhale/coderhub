const Router = require('koa-router')
const authRouter = new Router()
const { login, successToken } = require('../controller/auth-control')
const { verifyLogin, verifyToken } = require('../middleware/auth-middleware')
authRouter.post('/login', verifyLogin, login)
//test  测试token是否有效
authRouter.get('/test', verifyToken, successToken)

module.exports = authRouter