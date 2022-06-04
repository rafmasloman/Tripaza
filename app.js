const express = require('express');
const authenticationRoute = require('./routes/authenticationRoutes');
const {
  login,
  register,
  registerValidation,
} = require('./controller/authenticationController');

const app = express();
app.use(express.json());

// app.get('/user', login);
// app.post('/register', registerValidation, register);
app.use('/', authenticationRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
