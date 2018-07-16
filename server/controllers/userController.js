const User = require('../models/User')
const FB = require('fb')
const jwt = require('jsonwebtoken')

const login = function(req, res) {
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
          password: 'testpass'
        })
        .then(newUser => {
          let token = jwt.sign({ userId: newUser._id, email: newUser.email }, 'secretkey')
          console.log('User created', newUser, token)
          res
            .status(201)
            .json({ message: 'User created', token })
        })
      } else {
        let token = jwt.sign({ userId: user._id, email: user.email }, 'secretkey')
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

const getByUserId = function(req, res) {

}

module.exports = {
  login,
  getByUserId
}