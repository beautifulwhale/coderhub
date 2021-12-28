const connnections = require('../app/database')
class labelService {
    async create(name) {
        const statement = `insert into label (name) values (?);`
        const [result] = await connnections.execute(statement, [name])
        return result
    }
    async list(limit, offset) {
        const statement = `select * from label limit ?,?`
        const [result] = await connnections.execute(statement, [offset, limit])
        return result
    }
}
module.exports = new labelService()