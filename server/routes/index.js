var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

/* GET home page. */
router
  .route('/login')
  .post(userController.login)

module.exports = router;
