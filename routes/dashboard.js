const express = require('express');
const router = express.Router();

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/dashboard', checkAuth, (req, res) => {
  res.render('dashboard', { user: req.user });
});

module.exports = router;
