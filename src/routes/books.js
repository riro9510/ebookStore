const router = require('express').Router()
const booksController = require('../controllers/booksController')

router.post('/bulk', booksController.insertMultipleBooks)

router.put('/update/:id', booksController.updateBook)

module.exports = router
