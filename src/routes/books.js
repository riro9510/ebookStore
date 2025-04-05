const router = require('express').Router();
const booksController = require('../controllers/booksController');

router.post('/bulk', booksController.insertMultipleBooks);
// router.post('/', booksController.insertBook);

router.put('/:id', booksController.updateBook);
router.get('/:id', booksController.getSingleBook);
router.delete('/:id', booksController.deleteBook);
router.get('/update', booksController.buildBooksForm);
router.post('/update/:id', booksController.updateBook);
router.get('/', booksController.getAllBooks);

module.exports = router;
