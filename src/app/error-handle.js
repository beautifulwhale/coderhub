const { NAME_OR_PWD_IS_NULL, NAME_HAD_EXIST, NAME_DONOT_EXIST, PASSWORD_ISNOT_RIGHT } = require('../constants/errorTypes')
const errorHandle = (err, ctx) => {
    let status, message;
    switch (err.message) {
        case NAME_OR_PWD_IS_NULL:
            status = 400;
            message = '用户名或者密码不能为空'
            break;
        case NAME_HAD_EXIST:
            status = 409;
            message = '用户名已存在～'
            break;
        case NAME_DONOT_EXIST:
            status = 400;
            message = '用户名不存在～'
            break;
        case PASSWORD_ISNOT_RIGHT:
            status = 409;
            message = '用户名或密码输入错误，请重新输入'
            break;
        default:
            break;
    }
    ctx.status = status
    ctx.body = message
}
module.exports = errorHandle