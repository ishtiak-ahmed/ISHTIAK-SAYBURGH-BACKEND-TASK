const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');

router.route('/login').post(authController.loginUser);
router.route('/registerUser').post(authController.registerUser);
router.route('/loadUser').get(authController.loadUser);

module.exports = router;
