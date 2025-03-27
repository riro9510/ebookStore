const router = require('express').Router()
const booksController = require('../controllers/booksController')

router.use('/books', require('./books'))
router.get('/', (req, res) => {
  res.send('<a href="#">Click here to go to the API documentation</a>')
})


module.exports = router