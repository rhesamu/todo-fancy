const Todo = require('../models/Todo')

const getAll = function(req, res) {
  Todo.findAll({ author: req.headers.userId })
  .then(todos => {
    console.log(todos)
    res
      .status(200)
      .json({ message: 'Todo lists retrieved', todos })
  })
  .catch(err => {
    console.error(err)
    res
      .status(400)
      .json({ message: 'Database error', err })
  })
}

const getByTodoId = function(req, res) {
  Todo.findOne({ _id: req.params.todoId, author: req.headers.userId })
  .then(todo => {
    if (!todo) {
      res.status(404).json({message: `Todo not found`})
    } else {
      console.log(todo)
      res
        .status(200)
        .json({
          message: `Todo with ID: ${todo.id} retrieved`,
          todo: todo
        })
    }
  })
  .catch(err => {
    console.error(err)
    res
      .status(400)
      .json({ message: `Database error`, err })
  }) 
}

const create = function(req, res) {
  let inputData = {
    author: req.headers.userId,
    content: req.body.content
  }

  const { deadline, isImportant } = req.body

  if (deadline) inputData.deadline = deadline
  if (isImportant !== 'undefined') inputData.isImportant = isImportant

  Todo.create(inputData)
  .then(todo => {
    console.log(todo)
    res
      .status(201)
      .json({ message: `Todo list created`, todo })
  })
  .catch(err => {
    console.log(err)
    res
      .status(400)
      .json({ message: `Database error`, err })
  })
}

const update = function(req, res) {
  const { content, isComplete, deadline } = req.body
  let inputData = {}

  if (content) inputData.content = content
  if (deadline) inputData.deadline = deadline
  if (isImportant !== 'undefined') inputData.isImportant = isImportant
  if (isComplete !== 'undefined') inputData.isComplete = isComplete

  Todo.findOneAndUpdate({
    _id: req.params.todoId,
    author: req.headers.userId
  }, inputData)
  .then(todo => {
    console.log(todo)
    res
      .status(200)
      .json({ message: 'Todo list updated', todo })
  })
  .catch(err => {
    console.log(err)
    res
      .status(400)
      .json({ message: 'Database error', err })
  })
}

const remove = function(req, res) {
  Todo.findOneAndRemove({
    _id: req.params.todoId, 
    author: req.headers.userId
  })
  .then(todo => {
    console.log(todo)
    res
      .status(200)
      .json({ message: `Todo list deleted`, todo })
  })
  .catch(err => {
    console.error(err)
    res
      .status(400)
      .json({ message: `Database error`, err })
  })
}

module.exports = {
  getAll,
  getByTodoId,
  create,
  update,
  remove
}