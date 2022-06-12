const express = require('express');
const router = express.Router();

const {
  getFoodByName,
  getFoodById,
  user,
  food,
  editProfile,
} = require('../controller/userControler');
router.post('/user', user);
router.put('/user/edit', editProfile);
router.post('/', food);
router.post('/food/detail/:id', getFoodById);
router.post('/food/name', getFoodByName);
module.exports = router;
