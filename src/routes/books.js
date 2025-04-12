const router = require('express').Router();
const booksController = require('../controllers/booksController');
const { isAuthenticated } = require('../middleware/authenticate');
const { validateJoiSchema } = require('../middleware/validator');
const { bookSchema, manyBooksSchema } = require('../schemas/booksSchema');

// Create books
router.post(
  '/',
  isAuthenticated,
  validateJoiSchema(bookSchema),
  booksController.insertBook
);
router.post(
  '/bulk',
  isAuthenticated,
  validateJoiSchema(manyBooksSchema),
  booksController.insertMultipleBooks
);

// Update books
router.put('/:id', isAuthenticated, booksController.updateBook);
router.post('/update/:id', isAuthenticated, booksController.updateBook);
router.get('/update/:id', booksController.buildBooksForm);

// Read books
router.get('/:id', booksController.getSingleBook);
router.get('/', booksController.getAllBooks);

// Delete books
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;
