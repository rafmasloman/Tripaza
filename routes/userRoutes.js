const express = require('express');
const router = express.Router();

const {
  getFoodByName,
  getFoodById,
  user,
  food,
  editProfile,
} = require('../controller/userControler');
router.get('/user', user);
router.put('/user/edit', editProfile);
router.get('/home', food);
router.get('/food/detail/:id', getFoodById);
router.get('/food/:name', getFoodByName);
// router.get('/food/detail', getFood);
module.exports = router;
