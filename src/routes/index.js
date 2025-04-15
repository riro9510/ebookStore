const router = require('express').Router();
const baseController = require('../controllers/baseController');

const passport = require('../config/passport.js');
// const { githubCallback } = require('../controllers/');
router.use('/', require('./swagger'));

// Mount routes
router.use('/', require('./swagger'));
router.use(
  // #swagger.ignore = true
  '/books',
  require('./books.js')
);
router.use('/auth', require('./auth'));

router.use('/api', require('./api'));

router.get(
  // #swagger.ignore = true
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' })
  // githubCallback
);

// Login page
router.get(
  // #swagger.ignore = true
  '/login',
  (req, res) => {
    res.redirect('/auth/github');
  }
);

// Home page
router.get(
  // #swagger.ignore = true
  '/',
  baseController.buildHome
);

// Logout
router.get('/logout', function (req, res, next) {
  // #swagger.ignore = true
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
