const { login } = require('../services/auth-services')
class authControl {
    async login(ctx, next) {
        const { name } = ctx.request.body
        // const result = await login(user)
        ctx.body = `welcome${name}`
    }
}
module.exports = new authControl()