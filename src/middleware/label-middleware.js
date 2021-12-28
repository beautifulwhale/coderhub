const { isExistLabels } = require('../services/moment-service')
const { create } = require('../services/label-service')
const verifyLabels = async (ctx, next) => {
    const { labels } = ctx.request.body;
    const newLabels = []
    for (let name of labels) {
        //创建一个label对象 添加属性
        const label = { name }
        const isExistLabel = await isExistLabels(name)
        if (!isExistLabel) {
            //没有标签创建
            const result = await create(name)
            label.id = result.insertId
        } else {
            label.id = isExistLabel.id;
        }
        newLabels.push(label)
    }
    ctx.labels = newLabels
    await next()
}

module.exports = verifyLabels