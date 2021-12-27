const connnections = require('../app/database')
class momentService {
    async createMoment(id, content) {
        const statement = `insert into momnent (content, user_id) VALUES (?,?)`
        const result = await connnections.execute(statement, [content, id])
        return result
    }
    async getMomentById(id) {
        const statement = `select m.id       id,
        m.content  content,
        m.createAt createTime,
        m.updateAt updateTime,
        json_object('id',u.id,'name',u.name,'createTime',u.createAt) user
        from momnent m
          left join users u on m.user_id = u.id where u.id = ?;`
        const [result] = await connnections.execute(statement, [id])
        return result
    }
    async getMomentPage(offset, size) {
        const statement = `select m.id       id,
        m.content  content,
        m.createAt createTime,
        m.updateAt updateTime,
        json_object('id',u.id,'name',u.name,'createTime',u.createAt) user
        from momnent m
          left join users u on m.user_id = u.id limit ?,?;`
        const [result] = await connnections.execute(statement, [offset, size])
        return result
    }
    async updateMoment(content, momentId) {
        const statement = `update momnent set content = ? where id = ?;`
        const result = await connnections.execute(statement, [content, momentId])
        return result
    }
    async remove(momentId) {
        const statement = `delete from momnent where id = ?;`
        const result = await connnections.execute(statement, [momentId])
        return result
    }
}
module.exports = new momentService()