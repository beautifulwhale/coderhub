const { create } = require('../services/user_service')
class UserControl {
    async create(ctx, next) {
        const user = ctx.request.body
        const result = await create(user)
        ctx.body = result
    }
}
module.exports = new UserControl()