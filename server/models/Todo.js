const mongoose = require('mongoose')
const Schema = mongoose.Schema

let todoSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: String,
  deadline: Date,
  isComplete: {
    type: Boolean,
    default: false
  },
  isImportant: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Todo', todoSchema)