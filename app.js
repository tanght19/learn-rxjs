const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const compress = require('koa-compress')
const open = require('open')
const todos = require('./src/controller/todos')

const app = new Koa()

app.use(bodyParser())
app.use(logger())

app.use(koaStatic(path.resolve(__dirname, 'bower_components')))
app.use(koaStatic(path.resolve(__dirname, 'example')))
app.use(todos.routes())

app.listen(3000)
console.log('listening on port 3000')

// open('http://localhost:3000/index.html').then(() => {
//     console.log('listening on port 3000')
// })
