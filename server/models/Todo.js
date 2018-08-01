const mongoose = require('mongoose')
const Schema = mongoose.Schema

let todoSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  deadline: String,
  done: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Todo', todoSchema)