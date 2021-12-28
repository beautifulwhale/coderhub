const connnections = require('../app/database')
class momentService {
    async createMoment(id, content) {
        const statement = `insert into moment (content, user_id) VALUES (?,?)`
        const result = await connnections.execute(statement, [content, id])
        return result
    }
    async getMomentById(id) {
        const statement = `select m.id       id,
        m.content  content,
        m.createAt createTime,
        m.updateAt updateTime,
        json_object('id',u.id,'name',u.name,'avatarUrl',u.avatar_url) user
        from moment m
          left join users u on m.user_id = u.id where u.id = ?;`
        const [result] = await connnections.execute(statement, [id])
        return result
    }
    //分页查询
    async getMomentPage(offset, size) {
        const statement = `select m.id       id,
        m.content  content,
        m.createAt createTime,
        m.updateAt updateTime,
        json_object('id',u.id,'name',u.name,'avatarUrl',u.avatar_url) user,
        (select count(*) from comment where comment.moment_id=m.id) commentCount
        from moment m
          left join users u on m.user_id = u.id limit ?,?;`
        const [result] = await connnections.execute(statement, [offset, size])
        return result
    }
    async updateMoment(content, momentId) {
        const statement = `update moment set content = ? where id = ?;`
        const result = await connnections.execute(statement, [content, momentId])
        return result
    }
    async remove(momentId) {
        const statement = `delete from moment where id = ?;`
        const result = await connnections.execute(statement, [momentId])
        return result
    }
    //检查是否存在标签
    async isExistLabels(name) {
        const statement = `select * from label where name = ?`;
        const [result] = await connnections.execute(statement, [name])
        return result[0]
    }
    async isExistLabel(id, momentId) {
        const statement = `select * from moment_label where moment_id = ? and label_id = ?;`;
        const [result] = await connnections.execute(statement, [momentId, id])
        return result[0] ? true : false
    }

    async createLabel(id, momentId) {
        const statement = `insert into moment_label (moment_id, label_id) VALUES (?,?)`;
        const [result] = await connnections.execute(statement, [momentId, id])
        return result
    }
}
module.exports = new momentService()