const fs = require('fs')

const useRoutes = (app) => {
    fs.readdirSync(__dirname).forEach(item => {
        if (item === 'index.js') return;
        const router = require(`./${item}`)
        app.use(router.routes())
        app.use(router.allowedMethods())
    })
}
module.exports = useRoutes