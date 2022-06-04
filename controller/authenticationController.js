const db = require('../dbConnection');
const { body, validationResult, check } = require('express-validator');
const uuid = require('uuid');

const login = (req, res) => {
  db.query(
    {
      sql: 'SELECT * FROM users WHERE email=? AND password=?',
      values: [req.body.email, req.body.password],
    },
    (err, result) => {
      if (err) throw err;
      if (result.length < 1) {
        return res.status(404).send({
          status: false,
          message: 'email atau password salah',
        });
      }

      res.status(200).json({
        status: true,
        user: {
          userId: result[0].id,
          name: result[0].full_name,
        },
        message: 'Login Success',
      });
    }
  );
};

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

const register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = uuid.v1();
  db.query(
    {
      sql: `INSERT INTO users (email,password, full_name, birth_date, phone_number) VALUES ( ?,?,?,?, ?)`,
      values: [
        req.body.email,
        req.body.password,
        req.body.full_name,
        req.body.birth_date,
        req.body.phone_number,
      ],
    },

    (err, result) => {
      console.log(id);
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }
      res.status(200).json({
        status: true,
        user: result.values,
        message: 'Registrasi Berhasil',
      });
    }
  );
};

module.exports = { login, register, registerValidation };
