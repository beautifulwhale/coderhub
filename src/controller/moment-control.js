const { createMoment,
    getMomentById,
    getMomentPage,
    updateMoment,
    remove,
    isExistLabel,
    createLabel } = require('../services/moment-service')
class momentControl {
    async create(ctx, next) {
        const { id } = ctx.user
        const { content } = ctx.request.body
        const result = await createMoment(id, content)
        ctx.body = result
    }
    async getMomentByUserId(ctx, next) {
        // const id = parseInt(ctx.request.url.replace('/moment/', ''))
        const id = ctx.params.momentId
        const result = await getMomentById(id)
        ctx.body = result
    }
    async getMomentByPage(ctx, next) {
        const { offset, size } = ctx.query
        const result = await getMomentPage(offset, size)
        ctx.body = result
    }
    async update(ctx, next) {
        const { content } = ctx.request.body
        const momentId = ctx.params.momentId
        const result = await updateMoment(content, momentId)
        ctx.body = result
    }
    async remove(ctx, next) {
        const momentId = ctx.params.momentId
        const result = await remove(momentId)
        ctx.body = result
    }
    async addLabels(ctx, next) {
        const { labels } = ctx
        const { momentId } = ctx.params
        for (let label of labels) {
            const isExist = await isExistLabel(label.id, momentId)
            if (!isExist) {
                await createLabel(label.id, momentId)
            }
        }
        ctx.body = '动态添加标签成功～'
    }
}
module.exports = new momentControl()