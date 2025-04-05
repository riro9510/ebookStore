const router = require('express').Router();
const booksController = require('../controllers/booksController');

// route to get all books.
router.get('/', booksController.getAllBooks);

router.get('/:id', booksController.getSingle); // route to get a books by id.

router.post('/bulk', booksController.insertMultipleBooks)
router.post('/', booksController.insertBook)
router.get('/', booksController.getAllBooks)
router.get('/:id', booksController.getSingleBook)
router.put('/:id', booksController.updateBook)
router.delete('/:id', booksController.deleteBook)
router.get('/search', booksController.searchBooks)
router.patch('/:id', booksController.updateBookPartial)
router.get('/update', booksController.buildBooksForm)
router.post('/update/:id', booksController.updateBook)
module.exports = router