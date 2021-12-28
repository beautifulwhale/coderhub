const Router = require('koa-router')
const router = new Router({ prefix: "/label" })
const { verifyToken } = require('../middleware/auth-middleware')
const { create, labelList } = require('../controller/label-control')

//创建新的标签
router.post('/', verifyToken, create)

//分页查询所有标签
router.get("/", labelList)

module.exports = router

