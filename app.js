const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const compress = require('koa-compress')
const todos = require('./src/controller/todos')

const app = new Koa()

app.use(logger())
app.use(bodyParser())

app.use(koaStatic(path.resolve(__dirname, 'bower_components')))
app.use(koaStatic(path.resolve(__dirname, 'example')))
app.use(todos.routes())

app.listen(3000)
console.log('listening on port 3000')
