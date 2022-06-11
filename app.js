require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authenticationRoute = require('./routes/authenticationRoutes');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   session({
//     name: process.env.SESS_NAME,
//     secret: process.env.SESS_SECRET,
//     saveUninitialized: true,
//     cookie: { maxAge: process.env.TWO_HOURS },
//     resave: false,
//   })
// );

app.use('/', authenticationRoute);
app.use('/', userRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
