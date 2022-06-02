const express = require('express');
const db = require('./dbConnection');
const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
  db.query(
    {
      sql: 'SELECT * FROM users',
    },
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.get('/login', (req, res) => {
  // login(req.params.username, req.params.password);
  // res.json({
  //   username: req.params.username,
  //   password: req.params.password,
  // });
  db.query(
    {
      sql: 'SELECT * FROM users WHERE username=? AND password=?',
      values: [req.body.username, req.body.password],
    },
    (err, result) => {
      if (err) {
        // throw err;
        return res.status(400).send({
          message: 'error',
        });
      }
      if (!result.length) {
        // throw err;
        return res.status(404).send({
          message: 'There is no data',
        });
      }
      // const user = JSON.stringify(res);
      // console.log(JSON.parse(user));
      console.log(result.length);
      res.send(result);
    }
  );
});

// ? Router untuk registrasi user yang belum memiliki akun
app.get('/register', (req, res) => {
  db.query(
    {
      sql: `INSERT INTO users (username,password) VALUES (?,?)`,
      values: [req.query.username, req.query.password],
    },
    (err, result) => {
      console.log(result);
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }
      res.send('Registrasi berhasil');
    }
  );
});

app.listen(3000, () => {
  console.log('server berjalan');
});
