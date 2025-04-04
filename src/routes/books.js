const router = require('express').Router()
const booksController = require('../controllers/booksController')

router.post('/bulk', booksController.insertMultipleBooks)

router.put('/update', booksController.updateBook)

module.exports = router
