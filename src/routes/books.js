const router = require('express').Router()
const booksController = require('../controllers/booksController')

router.post('/bulk', booksController.insertMultipleBooks)
router.post('/', booksController.insertBook)
router.get('/', booksController.getAllBooks)
router.get('/:id', booksController.getSingleBook)
router.put('/:id', booksController.updateBook)
router.delete('/:id', booksController.deleteBook)
router.get('/search', booksController.searchBooks)
router.patch('/:id', booksController.updateBookPartial)
module.exports = router