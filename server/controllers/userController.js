const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = function(req, res) {
  let email = req.body.email
  let plainPass = req.body.password

  User.create({
    email,
    password: bcrypt.hashSync(plainPass, 8)
  })
  .then(newUser => {
    console.log(newUser)
    res.status(201).json({ message: 'user created', user: newUser })
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({ message: 'Database error', err })
  })
}

const getById = function(req, res) {
  User.findOne()
}

module.exports = {
  register, getById
}