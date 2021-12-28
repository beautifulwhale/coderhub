const { create, list } = require('../services/label-service')
class labelControl {
    async create(ctx, next) {
        const { name } = ctx.request.body
        const result = await create(name)
        ctx.body = result
    }

    async labelList(ctx, next) {
        const { limit, offset } = ctx.query;
        const result = await list(limit, offset)
        ctx.body = result
    }
}
module.exports = new labelControl()