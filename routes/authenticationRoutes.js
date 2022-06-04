const express = require('express');
const authenticationController = require('../controller/authenticationController');

const router = express.Router();
router.get('/login', authenticationController.login);
router.post(
  '/register',
  authenticationController.registerValidation,
  authenticationController.register
);

module.exports = router;
