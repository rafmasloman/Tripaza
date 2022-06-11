const mysql = require('mysql');

const cloudsql = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
};

const mysqldb = {
  host: 'localhost',
  user: 'root',
  database: 'tripaza',
  password: '',
};

// const db = mysql.createConnection(cloudsql);
const db = mysql.createPool(cloudsql);

const dbQuery = {};

dbQuery.updateData = (
  full_name,
  birth_date,
  phone_number,
  email,
  password,
  id
) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE users SET full_name=?,birth_date=?, phone_number=?, email=?, password=? WHERE id=?',
      [full_name, birth_date, phone_number, email, password, id],
      (error, user) => {
        if (error) {
          return reject(error);
        }
        return resolve(user);
      }
    );
  });
};

dbQuery.getUserData = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id=?', [id], (error, user) => {
      if (error) {
        return reject(error);
      }
      return resolve(user);
    });
  });
};

dbQuery.getUserByEmail = (email) => {
  return new Promise((resolve, reject) =>
    db.query('SELECT * FROM users WHERE email=?', [email], (err, result) => {
      if (result.length < 1) {
        return reject(err);
      }
      return resolve(result[0]);
    })
  );
};

dbQuery.insertUser = (full_name, birth_date, phone_number, email, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users (full_name, birth_date,phone_number, email, password) VALUES (?,?, ?, ?, ?)',
      [full_name, birth_date, phone_number, email, password],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.insertId);
      }
    );
  });
};

dbQuery.getFood = () => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT restaurant_name, restaurant_address, food_name FROM foods',
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

dbQuery.getFoodById = (foodId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT restaurant_name, restaurant_address, food_name FROM foods WHERE id=?',
      [foodId],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

dbQuery.getFoodByName = () => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT food_name,restaurant_name,restaurant_address FROM foods',
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Koneksi berhasil');
// });

module.exports = { db, dbQuery };
