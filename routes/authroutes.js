const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.send('Email already registered.');

  const hashedPassword = await bcrypt.hash(password, 10);
  user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.redirect('/login');
});

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Login Handle
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/login'));
});

module.exports = router;
