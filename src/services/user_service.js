const connnections = require('../app/database')
class userService {
    async create(user) {
        const { name, password } = user
        const statement = `insert into users (name, password) VALUES (?,?)`
        const result = await connnections.execute(statement, [name, password])
        return result
    }
    async getUserByName(name){
        const statement = `select * from users where name = ?;`
        const result = await connnections.execute(statement,[name])
        return result[0]
    }
}
module.exports = new userService()