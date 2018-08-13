const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const { isAuthenticated } = require('../middlewares/auth')

router
  .route('/')
  .get(
    isAuthenticated,
    TodoController.getAll
  )
  .post(
    isAuthenticated,
    TodoController.create
  )

router
  .route('/:todoId')
  .get(
    isAuthenticated,
    TodoController.getByTodoId
  )
  .put(
    isAuthenticated,
    TodoController.update
  )
  .delete(
    isAuthenticated,
    TodoController.remove
  )

module.exports = router