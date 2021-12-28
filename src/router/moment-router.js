const Router = require('koa-router')
const momentRouter = new Router({ prefix: "/moment" })
const { create, getMomentByUserId, getMomentByPage, update, remove, addLabels } = require('../controller/moment-control')
const { verifyToken, verifyPermission } = require('../middleware/auth-middleware')
const verifyLabels = require('../middleware/label-middleware')
momentRouter.post('/', verifyToken, create)
//根据用户ID查询用户发布动态
momentRouter.get('/:momentId', getMomentByUserId)

//分页查询所有动态
momentRouter.get('/', getMomentByPage)

//用户修改动态
momentRouter.patch('/:momentId', verifyToken, verifyPermission, update)

//用户删除动态
momentRouter.delete('/:momentId', verifyToken, verifyPermission, remove)

momentRouter.post('/:momentId/labels', verifyToken, verifyPermission, verifyLabels, addLabels)

module.exports = momentRouter
