const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/books', require('./books'));
router.use('/users', require('./users'));

router.get('/', (req, res) => {
  // #swagger.ignore = true
  res.send(
    '<a href="/api-docs/">Click here to go to the API documentation</a>'
  );
});

module.exports = router;
