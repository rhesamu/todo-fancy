const Todo = require('../models/Todo')

const getAll = function(req, res) {
  console.log('req.user -->',req.user)
  Todo.find({ author: req.user.userId })
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
  Todo.findOne({ _id: req.params.todoId })
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
    author: req.user.userId,
    title: req.body.title
  }

  const { deadline } = req.body

  if (deadline) inputData.deadline = deadline
  // if (isImportant !== 'undefined') inputData.isImportant = isImportant

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
  const { title, deadline, done } = req.body
  let inputData = {}

  if (title) { inputData.title = title }
  if (deadline) { inputData.deadline = deadline }
  if (done === true || done === false) { inputData.done = done }

  console.log('inputData',inputData)
  
  let { todoId } = req.params
  Todo.findByIdAndUpdate(todoId, inputData, { new: true })
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
    // author: req.user.userId
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