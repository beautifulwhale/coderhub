const { NAME_OR_PWD_IS_NULL, NAME_HAD_EXIST } = require('../constants/errorTypes')
const { getUserByName } = require('../services/user_service')
const mdPassword = require('../utils/handle-password')
const verifyUser = async (ctx, next) => {
    const { name, password } = ctx.request.body;
    //判断用户名或者密码是否为空
    if (!name || !password) {
        const error = new Error(NAME_OR_PWD_IS_NULL)
        return ctx.app.emit('error', error, ctx)
    }
    //查询数据库查看是否存在相同名称
    const result = await getUserByName(name);
    if (result.length) {
        const error = new Error(NAME_HAD_EXIST)
        return ctx.app.emit('error', error, ctx)
    }

    //没有错误 执行添加的中间件
    await next();
}
const handlePassword = async (ctx, next) => {
    const { password } = ctx.request.body
    ctx.request.body.password = mdPassword(password)
    await next()
}
module.exports = { verifyUser, handlePassword }