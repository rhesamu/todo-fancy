require('dotenv').config()
const jwt = require('jsonwebtoken')

const isAuthenticated = function(req, res, next) {
  let token = req.headers.token
  console.log('token -->',token)
  if (token) {
    try {
      let decoded = jwt.verify(token, process.env.SECRET_KEY)
      console.log('decoded -->',decoded)
      
      req['user'] = decoded
      next()
    } catch (error) {
      res.status(400).json({ message: 'auth error', error })
    }
  } else {
    res.status(400).json({ message: 'You have to login first', error: 'You have to login first' })
  }
}

module.exports = {
  isAuthenticated
}