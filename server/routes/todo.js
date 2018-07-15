const router = require('express').Router()
const Todo = require('../controllers/todoController')

router
  .route('/')
  .get(Todo.getAll)
  .post(Todo.create)

router
  .route('/:todoId')
  .get(Todo.getByTodoId)
  .put(Todo.update)
  .delete(Todo.remove)

module.exports = router