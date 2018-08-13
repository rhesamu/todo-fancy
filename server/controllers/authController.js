require('dotenv').config()
const User = require('../models/User')
const FB = require('fb')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const loginFB = function(req, res) {
  const { fbtoken } = req.headers
  // console.log('Fb token -->', fbtoken)
  FB.setAccessToken(fbtoken)
  FB.api('me', {
    fields: ['id', 'name', 'email'],
  }, function(response) {
    console.log(response)

    User.findOne({ fbid: response.id, email: response.email })
    .then(user => {
      if (!user) {
        User.create({
          name: response.name,
          email: response.email,
          fbid: response.id,
          password: bcrypt.hashSync(response.id, 8)
        })
        .then(newUser => {
          let token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.SECRET_KEY)
          console.log('User created', newUser, token)
          res
            .status(201)
            .json({ message: 'User created', token })
        })
      } else {
        let token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY)
        console.log('User found', user, token)
        res
          .status(200)
          .json({ message: 'User found', token})
      }
    })
    .catch(err => {
      console.log('Database error',err)
      res.status(400).json({ message: 'Database error', err })
    })
  })
}

const login = function(req, res) {
  User.findOne({ email: req.body.email })
  .then(user => {
    let passCheck = bcrypt.compareSync(req.body.password, user.password)
    if (!passCheck) {
      return res.status(400).json({ error: 'Please input correct email / password' })
    }
    
    let token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY)
    console.log('User found', user, token)
    res.status(200).json({ message: 'User found', token })
  })
  .catch(err => {
    res.status(400).json({ message: 'Database error', error: err })
  })
}

module.exports = {
  loginFB,
  login
}