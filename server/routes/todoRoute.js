const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const auth = require('../middlewares/auth')

router
  .route('/')
  .get(
    auth.isAuthenticated,
    TodoController.getAll
  )
  .post(
    auth.isAuthenticated,
    TodoController.create
  )

router
  .route('/:todoId')
  .get(TodoController.getByTodoId)
  .put(TodoController.update)
  .delete(TodoController.remove)

module.exports = router