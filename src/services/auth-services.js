const connnections = require('../app/database')
class authService {
    async hasPermission(tableName, id, tableId) {
        const statement = `select * from ${tableName} where id = ? and user_id = ?;`
        const [result] = await connnections.execute(statement, [tableId, id])
        return result.length === 0 ? false : true
    }
}
module.exports = new authService()