const todos = require('../model/todos')

const Router = require('koa-router')

const router = new Router()

const controller = {
  list(ctx, next) {
    ctx.body = todos.list()
  },
  find(ctx, next) {
    const id = ctx.params.id
    let item

    if (!id) {
      throw new Error('todos id is essential.')
    }

    item = todos.list(+id)

    if (!item) {
      throw new Error('todo item is not exist')
    }

    ctx.body = item
  },
  add(ctx, next) {
    if (!ctx.request.body.text) {
      throw new Error('todo text is essential')
    }

    todos.add(ctx.request.body.text)

    ctx.body = {
      code: 200,
      status: true
    }
  },
  edit(ctx, next) {
    const {id} = ctx.params
    const {text} = ctx.request.body

    console.log(ctx.params, ctx.request.body)

    if(id === undefined || text === undefined){
      throw new Error(400)
    }

    todos.edit(id, text)
    ctx.body = {
      code: 200,
      status: true
    }
  },
  del(ctx, next){
    todos.remove(+ctx.params.id)
  }
}

router.get('/todos/', controller.list)
.get('/todos/:id', controller.find)
.post('/todos/', controller.add)
.put('/todos/:id', controller.edit)
.del('/todos/:id', controller.del)

module.exports = router
