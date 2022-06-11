const express = require('express');
const authenticationController = require('../controller/authenticationController');
const { profile } = require('../controller/userControler');

const router = express.Router();
router.post('/login', authenticationController.login);
router.post(
  '/register',
  authenticationController.registerValidation,
  authenticationController.register
);
router.post('/logout', authenticationController.logout);

module.exports = router;
