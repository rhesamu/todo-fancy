var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

/* GET home page. */
// router.post('/fbLogin', authController.loginFB)

router
  .route('/login')
  .post(authController.login)

router
  .route('/loginFB')
  .post(authController.loginFB)

router
  .route('/register')
  .post(userController.register)

module.exports = router;
