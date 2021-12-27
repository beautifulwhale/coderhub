const jwt = require('jsonwebtoken')
const { NAME_OR_PWD_IS_NULL, NAME_DONOT_EXIST, PASSWORD_ISNOT_RIGHT, UNAUTHORIZATION, UNPERMISSION } = require('../constants/errorTypes')
const { getUserByName } = require('../services/user_service')
const { hasPermission } = require('../services/auth-services')
const mdPassword = require('../utils/handle-password')
const { PUBLIC_KEY } = require('../app/config')
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

    //把用户保存到ctx中，用于设置token
    ctx.user = user
    //没有错误 执行添加的中间件
    await next();
}
const verifyToken = async (ctx, next) => {
    const authorization = ctx.request.headers.authorization
    if (!authorization) {
        const error = new Error(UNAUTHORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
    const token = authorization.replace('Bearer ', '');
    try {
        //返回id name time
        const decoded = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })
        ctx.user = decoded
        await next()
    } catch (err) {
        const error = new Error(UNAUTHORIZATION)
        ctx.app.emit('error', error, ctx)
    }
}
const verifyPermission = async (ctx, next) => {
    const [resourceKey] = Object.keys(ctx.params);
    const tableName = resourceKey.replace('Id', '');
    const resourceVal = ctx.params[resourceKey]
    const { id } = ctx.user
    try {
        const isPermission = await hasPermission(tableName, id, resourceVal)
        if (!isPermission) throw new Error();
        await next()
    } catch (error) {
        const err = new Error(UNPERMISSION)
        ctx.app.emit('error', err, ctx)
    }

}
module.exports = { verifyLogin, verifyToken, verifyPermission }