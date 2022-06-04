const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Koneksi berhasil');
});

module.exports = db;
