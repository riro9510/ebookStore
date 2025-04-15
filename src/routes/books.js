const router = require('express').Router();
const booksController = require('../controllers/booksController');

router.get('/', booksController.buildBooksListPage);
router.get('/:id', booksController.buildBookDetailsPage);
router.get('/update/:id', booksController.buildBooksForm);

module.exports = router;
