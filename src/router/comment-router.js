const Router = require('koa-router')
const router = new Router({ prefix: '/comment' })
const { verifyToken, verifyPermission } = require('../middleware/auth-middleware')
const { createComment, reply, update, remove } = require('../controller/comment-control')
//发布评论
router.post('/', verifyToken, createComment)

//回复评论
router.post('/:commentId/reply', verifyToken, reply)

//修改评论
router.patch('/:commentId', verifyToken, verifyPermission, update)

//删除评论
router.delete('/:commentId', verifyToken, verifyPermission, remove)

module.exports = router