const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboard');
require('./config/passportConfig')(passport);

const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/auth-system')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', authRoutes);
app.use('/', dashboardRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
