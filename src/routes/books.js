const router = require('express').Router();
const booksController = require('../controllers/booksController');

// route to get all books.
router.get('/', booksController.getAllBooks);

router.get('/:id', booksController.getSingle); // route to get a books by id.

router.post('/bulk', booksController.insertMultipleBooks);

router.get('/update', booksController.buildBooksForm);

router.put('/update/:id', booksController.updateBook);

router.delete('/:id', booksController.deleteBook);

module.exports = router;
