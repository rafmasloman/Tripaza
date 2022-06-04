const express = require('express');
const bodyParser = require('body-parser');
const authenticationRoute = require('./routes/authenticationRoutes');
const {
  login,
  register,
  registerValidation,
} = require('./controller/authenticationController');

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/user', login);
// app.post('/register', registerValidation, register);
app.use('/', authenticationRoute);

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
