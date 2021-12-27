const { create, reply, update, remove } = require('../services/comment-service')
class commentControl {
    async createComment(ctx, next) {
        const { id } = ctx.user;
        const { content, momentId } = ctx.request.body;
        const result = await create(id, content, momentId);
        ctx.body = result;
    }
    async reply(ctx, next) {
        const { id } = ctx.user;
        const { content, momentId } = ctx.request.body;
        const { commentId } = ctx.params
        const result = await reply(id, content, momentId, commentId);
        ctx.body = result;
    }
    async update(ctx, next) {
        const { content } = ctx.request.body;
        const { commentId } = ctx.params
        const result = await update(content, commentId);
        ctx.body = result;
    }
    async remove(ctx, next) {
        const { commentId } = ctx.params
        const result = await remove(commentId)
        ctx.body = result
    }
}


module.exports = new commentControl()