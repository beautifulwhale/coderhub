const connnections = require('../app/database')
class fileService {
    async updateAvatars(mimetype, filename, size, id) {
        const statement = `insert into avatar (filename, mimetype, size, user_id) VALUES (?,?,?,?);`
        const [result] = await connnections.execute(statement, [filename, mimetype, size, id])
        return result
    }
    async getAvatarDetail(userId) {
        const statement = `select * from avatar where user_id = ?;`;
        const [result] = await connnections.execute(statement, [userId])
        return result[0]
    }
    async updateAvatarUrl(avatarUrl, id) {
        const statement = `update users set avatar_url = ? where id = ?;`;
        const [result] = await connnections.execute(statement, [avatarUrl, id])
        return result
    }
    async updatePictures(mimetype, filename, size, id, momentId) {
        const statement = `insert into file (filename, mimetype, size, user_id,moment_id) VALUES (?,?,?,?,?);`
        const [result] = await connnections.execute(statement, [filename, mimetype, size, id, momentId])
        return result
    }
}
module.exports = new fileService()