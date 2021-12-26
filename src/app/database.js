const mysql = require('mysql2')
const config = require('./config')
const connnections = mysql.createPool({
    host: config.MYSQL_HOST,
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD
})

connnections.getConnection((err, conn) => {
    if (err) {
        console.log('连接数据库失败')
    } else {
        console.log('连接数据库成功')
    }
})
module.exports = connnections.promise()