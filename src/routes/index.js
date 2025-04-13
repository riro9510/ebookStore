const router = require('express').Router();
const baseController = require('../controllers/baseController');

const passport = require('../config/passport.js');
const { githubCallback } = require('../controller/authController');
router.use('/', require('./swagger'));

// Mount routes
router.use('/', require('./swagger'));
router.use('/books', require('./books'));
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));

// router.get('/',
//   // #swagger.ignore = true
//   baseController.buildHome)

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  githubCallback
);
// Login page
router.get('/login', (req, res) => {
  res.send('<a href="/auth/github">Login With Github</a>');
});

// Home page
router.get('/', (req, res) => {
  console.log('user:', req.user);
  console.log('session:', req.session);
  const loggedStatus =
    req.user !== undefined
      ? `Logged in as ${req.user.displayName}`
      : 'Logged out';

  res.send(`
    <p>${loggedStatus}</p>
    <a href="/api-docs/">Click here to go to the API documentation</a>
  `);
});

// Logout
router.get('/logout', function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
