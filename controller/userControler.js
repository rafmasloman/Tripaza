const { dbQuery } = require('../models/dbConnection');
const { jwt, bcrypt } = require('./authenticationController');
const { body, validationResult, check } = require('express-validator');

const user = async (req, res) => {
  try {
    const user = await dbQuery.getUserData(req.body.id);
    if (user) {
      res.json({
        status: true,
        data: {
          id: user[0].id,
          full_name: user[0].full_name,
          email: user[0].email,
          birthday: user[0].birth_date,
          phone_number: user[0].phone_number,
        },
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: 'Cannot find user',
    });
  }
};

const editProfile = async (req, res) => {
  try {
    const token = req.body.token;
    const salt = 10;
    const { full_name, birth_date, phone_number, email, password, id } =
      req.body;
    // const { id } = jwt.verify(token, process.env.TOKEN_SECRET);

    const hashPassword = bcrypt.hashSync(password, salt);

    const userProfile = await dbQuery.updateData(
      full_name,
      birth_date,
      phone_number,
      email,
      hashPassword,
      id
    );

    res.json({
      message: 'Success update data',
      user: userProfile,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.sqlMessage,
    });
  }
};

const food = async (req, res) => {
  const foods = await dbQuery.getFood();
  // for (let i = 0; i < foods.length; i++) {
  //   const element = array[i];
  // }
  if (!foods) {
  }
  res.json({
    status: true,
    foods,
    message: 'Homepage',
  });
};

const getFoodById = async (req, res) => {
  const food = await dbQuery.getFoodById(req.params.id);
  console.log(food);
  res.json({
    status: true,
    message: 'success',
    food,
  });
};

const getFoodByName = async (req, res) => {
  const food = await dbQuery.getFood();

  const parseName = JSON.parse(JSON.stringify(food));
  const foodName = [];
  for (let i = 0; i < parseName.length; i++) {
    // parseName[i].food_name = parseName[i].food_name.replace('\r', '');
    if (parseName[i].food_name.includes(req.body.food_name)) {
      foodName.push(parseName[i]);
    }
  }

  res.json({
    status: true,
    foodName,
  });
};

module.exports = {
  user,
  editProfile,
  food,
  getFoodById,
  getFoodByName,
};
