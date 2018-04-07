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
    if (!ctx.params.text) {
      throw new Error('todo text is essential')
    }

    todos.add(ctx.params.text)

    ctx.body = {
      code: 200,
      status: true
    }
  },
  update(ctx, next) {
    const {id, text, status} = ctx.params

    if(id === undefined || text === undefined || status === undefined){
      throw new Error('400')
    }

    todos.update(ctx.params)
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
.get('/list/', controller.list)
.get('/todos/:id', controller.find)
.post('/todos/', controller.add)
.put('/todos/:id', controller.update)
.delete('/todos/:id', controller.del)

module.exports = router
