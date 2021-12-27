const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config')

class authControl {
    async login(ctx, next) {
        const { name, id } = ctx.user
        const token = jwt.sign({ name, id }, PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: 60 * 60 * 24
        })
        ctx.body = { id, name, token }
    }
    async successToken(ctx, next) {
        console.log(ctx.user)
        ctx.body = 'token授权成功'
    }
}
module.exports = new authControl()