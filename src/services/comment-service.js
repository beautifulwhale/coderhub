const connnections = require('../app/database')
class commentService {
    async create(id, content, momentId) {
        const statement = `insert into comment (content, moment_id, user_id) VALUES (?,?,?);`
        const [result] = await connnections.execute(statement, [content, momentId, id])
        return result
    }
    async reply(id, content, momentId, commentId) {
        const statement = `insert into comment (content, moment_id, user_id,comment_id) VALUES (?,?,?,?);`
        const [result] = await connnections.execute(statement, [content, momentId, id, commentId])
        return result
    }
    async update(content, commentId) {
        const statement = `update comment set content = ? where comment_id = ?;`
        const [result] = await connnections.execute(statement, [content, commentId])
        return result
    }
    async remove(commentId) {
        const statement = `delete from comment where comment_id = ?;`
        const [result] = await connnections.execute(statement, [commentId])
        return result
    }
    async getComment(momentId) {
        const statement = `select m.id id, m.content content, json_object('id', u.id, 'name', u.name) user
        from comment m
                 left join users u on m.user_id = u.id
        where moment_id = ?;`
        const [result] = await connnections.execute(statement, [momentId])
        return result
    }
}
module.exports = new commentService()