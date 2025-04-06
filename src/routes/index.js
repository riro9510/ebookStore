const router = require('express').Router();
// const booksController = require('../controllers/booksController');

router.use('/', require('./swagger'));

router.use('/books', require('./books'));
router.use('/users', require('./users'));

router.get('/', (req, res) => {
  res.send('<a href="#">Click here to go to the API documentation</a>');
});

module.exports = router;
