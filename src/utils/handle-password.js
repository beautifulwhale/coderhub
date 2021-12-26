const crypto = require('crypto')
const mdPassword = (password) => {
    //选择加密算法
    const md5 = crypto.createHash('md5')
    const result = md5.update(password).digest('hex')
    return result
}
module.exports = mdPassword