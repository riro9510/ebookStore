const router = require('express').Router();

router.use('/books', require('./books'));
router.use('/reviews', require('./reviews'));
router.use('/cart', require('./cart'));
router.use('/users', require('./users'));

router.use('/', (req, res) => {
  // #swagger.ignore = true
  res.redirect('../api-docs');
});

module.exports = router;
