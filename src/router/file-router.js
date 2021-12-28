const Router = require('koa-router')
const router = new Router({ prefix: "/upload" })
const { verifyToken } = require('../middleware/auth-middleware')
const { handleAvatar, handlePicture } = require('../middleware/file-middleware')
const { updateAvatar, getUserAvatar, updatePicture } = require("../controller/file-control")
//上传头像
router.post('/avatar', verifyToken, handleAvatar, updateAvatar)

//根据用户id获取头像图片
router.get('/:userId/avatar', getUserAvatar)

//给动态上传多张图片
router.post('/picture', verifyToken, handlePicture, updatePicture)


module.exports = router
