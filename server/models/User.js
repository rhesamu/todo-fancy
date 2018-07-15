const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  username: String,
  password: String,
  fbid: String
})

module.exports = mongoose.model('User', userSchema)