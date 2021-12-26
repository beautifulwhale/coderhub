const { NAME_OR_PWD_IS_NULL, NAME_DONOT_EXIST, PASSWORD_ISNOT_RIGHT } = require('../constants/errorTypes')
const { getUserByName } = require('../services/user_service')
const mdPassword = require('../utils/handle-password')
const verifyLogin = async (ctx, next) => {
    const { name, password } = ctx.request.body;
    //1.判断用户名或者密码是否为空
    if (!name || !password) {
        const error = new Error(NAME_OR_PWD_IS_NULL)
        return ctx.app.emit('error', error, ctx)
    }
    //2.查看输入的用户名是否存在
    const result = await getUserByName(name);
    const user = result[0]
    if (!user) {
        const error = new Error(NAME_DONOT_EXIST)
        return ctx.app.emit('error', error, ctx)
    }
    //3.校验用户名密码是否正确
    const md5Password = mdPassword(password);
    if (md5Password !== user.password) {
        const error = new Error(PASSWORD_ISNOT_RIGHT)
        return ctx.app.emit('error', error, ctx)
    }

    //没有错误 执行添加的中间件
    await next();
}
module.exports = verifyLogin