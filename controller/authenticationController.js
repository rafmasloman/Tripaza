const { db, dbQuery } = require('../models/dbConnection');
const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const login = async (req, res) => {
  try {
    const email = req.body.email;
    let password = req.body.password;
    const user = await dbQuery.getUserByEmail(email);
    console.log(user);
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      // expiresIn: 86400,
      expiresIn: '20s',
    });

    const isPasswordTrue = bcrypt.compareSync(password, user.password);
    // if (!user) {
    //   return res.json({
    //     status: false,
    //     message: 'Email atau password salah',
    //   });
    // }
    console.log(isPasswordTrue);
    if (!isPasswordTrue) {
      return res.json({
        status: false,
        message: 'Login Failed',
      });
    }

    return res.json({
      status: true,
      message: 'Login Success',
      token: token,
    });

    // res.redirect('/user');
  } catch (err) {
    res.json({
      message: 'Email atau Password salah',
    });
  }
};

const logout = (req, res) => {
  const token = req.body.token;
  const out = jwt.destroy(token);
  res.json({
    message: 'Logout Success',
    message: out,
  });
};

// const hashPassword = (userPassword) => {
//   const salt = 10;
//   const password = bcrypt.hashSync(userPassword, salt);
//   return password;
// };

const registerValidation = [
  body('email').isEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password harus memiliki panjang minimal 6')
    .matches(/\d/)
    .withMessage('Password harus mengandung angka'),
  body('full_name').isString(),
  body('birth_date').isDate(),
  body('phone_number')
    .isMobilePhone()
    .withMessage('Gunakan Format Nomor Telepon'),
];

const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { full_name, birth_date, phone_number, email, password } = req.body;

  const id = uuid.v1();
  const salt = 10;
  const hashPassword = bcrypt.hashSync(password, salt);
  const user = await dbQuery.insertUser(
    full_name,
    birth_date,
    phone_number,
    email,
    hashPassword
  );

  res.json({
    status: 'success',
    message: 'register success',
  });
  // .then((data) =>
  //   res.json({
  //     message: 'register succes',
  //   })
  // )
  // .catch((err) => {
  //   res.json({
  //     message: err,
  //   });
  // });
  // req.session.userId = user.id;
};

module.exports = { login, register, logout, registerValidation, bcrypt, jwt };
