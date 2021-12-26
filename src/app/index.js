const Koa = require('koa')

const bodyParser = require('koa-bodyparser');


require('../app/database')
const errorHandle = require('./error-handle')
const useRoutes = require('../router')
const app = new Koa()
 
// app.useRoutes = useRoutes
// app.useRoutes()
app.on('error', errorHandle)
app.use(bodyParser());
useRoutes(app)



module.exports = app