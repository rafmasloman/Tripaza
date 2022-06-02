const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'tripaza',
  password: '',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Koneksi berhasil');
});

module.exports = db;
