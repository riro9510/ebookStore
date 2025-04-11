const router = require('express').Router();
const booksController = require('../controllers/booksController');
const {isAuthenticated} = require("../middleware/authentificate.js");
const passport = require('passport');

router.post('/bulk',isAuthenticated, booksController.insertMultipleBooks);
router.post('/',isAuthenticated, booksController.insertBook);

router.put('/:id',isAuthenticated, booksController.updateBook);
router.get('/:id', booksController.getSingleBook);
router.delete('/:id',isAuthenticated, booksController.deleteBook);
router.get('/update/:id', booksController.buildBooksForm);
router.post('/update/:id',isAuthenticated, booksController.updateBook);
router.get('/', booksController.getAllBooks);

module.exports = router;
