const { updateAvatars, getAvatarDetail, updateAvatarUrl, updatePictures } = require('../services/file-service')
const fs = require('fs')
const { AVATAR_PATH } = require('../constants/file-path')
const config = require('../app/config')

class fileControl {
    async updateAvatar(ctx, next) {
        const { mimetype, filename, size } = ctx.req.file
        const { id } = ctx.user
        await updateAvatars(mimetype, filename, size, id)
        //将用户头像保存到用户表中
        // http://localhost:8000/upload/3/avatar
        const avatarUrl = `${config.APP_HOST}:${config.APP_PORT}/upload/${id}/avatar`
        const result = await updateAvatarUrl(avatarUrl, id)
        ctx.body = {
            message: '头像上传成功',
            data: result
        }
    }
    async getUserAvatar(ctx, next) {
        const { userId } = ctx.params
        //根据用户ID去查询头像
        const avatarDetail = await getAvatarDetail(userId)
        ctx.response.set('content-type', avatarDetail.mimetype)
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarDetail.filename}`)
    }
    async updatePicture(ctx, next) {
        const { id } = ctx.user
        const { momentId } = ctx.query
        const files = ctx.req.files
        console.log(files)
        for (let file of files) {
            const { mimetype, filename, size } = file
            await updatePictures(mimetype, filename, size, id, momentId)
        }
        ctx.body = {
            code: 200,
            message: '给动态上传图片成功～'
        }
    }
}

module.exports = new fileControl()