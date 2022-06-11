const { dbQuery } = require('../models/dbConnection');
const { jwt, bcrypt } = require('./authenticationController');

const user = async (req, res) => {
  const token = req.body.token;
  const id = jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
    if (err) {
      return res.json({
        status: false,
        message: 'You has been logout',
      });
    }
    return decode.id;
  });

  console.log(id);
  const user = await dbQuery.getUserData(id);
  res.json({
    status: true,
    data: {
      id: id,
      full_name: user[0].full_name,
      email: user[0].email,
      birthday: user[0].birt_date,
      phone_number: user[0].phone_number,
    },
  });
};

const editProfile = async (req, res) => {
  const token = req.body.token;
  const salt = 10;
  const { full_name, birth_date, phone_number, email, password } = req.body;
  const { id } = jwt.verify(token, process.env.TOKEN_SECRET);

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
};

const food = async (req, res) => {
  const foods = await dbQuery.getFood();
  for (let i = 0; i < foods.length; i++) {
    const element = array[i];
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
  const name = await dbQuery.getFoodByName();

  const parseName = JSON.parse(JSON.stringify(name));
  const foodName = [];
  for (let i = 0; i < parseName.length; i++) {
    parseName[i].food_name = parseName[i].food_name.replace('\r', '');
    if (parseName[i].food_name.includes(req.params.name)) {
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
