const router = require('express').Router();
const passport = require('../config/passport.js');

router.get(
  '/github',
  (req, res, next) => {
    // #swagger.ignore = true
    next();
  },
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // #swagger.ignore = true
    res.redirect('/');
  }
);

module.exports = router;
