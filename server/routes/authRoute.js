const router = require('express').Router()
const authController = require('../controllers/authController')
const auth = require('../middlewares/auth')

router.post('/fbLogin', authController.loginFB)
router.post('/login', authController.login)

module.exports = router