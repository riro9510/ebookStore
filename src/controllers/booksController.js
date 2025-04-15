const booksModel = require('../models/booksModel');
const { ObjectId } = require('mongodb');
const { validateObjectId } = require('../utilities/index');
const { query } = require('../database');

/**
 * Insert multiple books from an array in request body
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function insertMultipleBooks(req, res) {
  /* #swagger.tags = ['Books']
     #swagger.summary = 'Insert multiple books into the database'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: [{ $ref: '#/definitions/Books' }]
     }
     #swagger.responses[201] = {
       description: 'Books inserted successfully',
       schema: { newBookIds: ['ObjectId'] }
     }
     #swagger.responses[500] = {
       description: 'Failed to add books'
     }
  */
  try {
    const booksList = req.body;
    const newBookIds = await booksModel.insertMultipleBooks(booksList);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(Object.values(newBookIds));
  } catch {
    res.status(500).json({ error: 'Failed to add books' });
  }
}

/**
 * Insert a single book into the database
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware
 */
async function insertBook(req, res, next) {
  /* #swagger.tags = ['Books']
     #swagger.summary = 'Insert a new book into the database'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/Books' }
     }
     #swagger.responses[201] = {
       description: 'Book created successfully',
       schema: { id: 'ObjectId' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error'
     }
  */
  try {
    const bookData = req.body;
    const newBookId = await booksModel.insertBook(bookData);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ _id: newBookId });
  } catch (err) {
    next(err);
  }
}

/**
 * Get a single book by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getSingleBook = async (req, res, next) => {
  /* #swagger.tags = ['Books']
     #swagger.summary = 'Get a book by ID'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
     #swagger.responses[200] = {
       description: 'Book found',
       schema: { $ref: '#/definitions/Books' }
     }
     #swagger.responses[404] = {
       description: 'Book not found'
     }
     #swagger.responses[400] = {
       description: 'Invalid ID format'
     }
  */
  try {
    const bookId = validateObjectId(req.params.id);
    const result = await booksModel.getBookById(bookId);
    const reviews = await query('reviews', { bookId: `${bookId}` });

    if (!result) {
      const err = new Error('Book not found');
      err.status = 404;
      throw err;
    }
    let book = result;
    res.status(200).render('./books/book-detail', {
      title: 'Book Details',
      book,
      reviews: reviews || null,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all books from the database
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getAllBooks = async (req, res, next) => {
  /* #swagger.tags = ['Books']
     #swagger.summary = 'Get all books in the database'
     #swagger.responses[200] = {
       description: 'List of books',
       schema: [{ $ref: '#/definitions/Books' }]
     }
     #swagger.responses[404] = {
       description: 'No books found'
     }
  */
  try {
    const books = await booksModel.getAllBooks();

    if (books.length === 0) {
      const err = new Error('No books found');
      err.status = 404;
      throw err;
    }
    res.status(200).render('./books/books-list', {
      books,
      title: 'Book List',
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update a book by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function updateBook(req, res) {
  /* #swagger.tags = ['Books']
     #swagger.summary = 'Update a book by ID'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/Books' }
     }
     #swagger.responses[204] = {
       description: 'Book updated successfully'
     }
     #swagger.responses[404] = {
       description: 'Book not found'
     }
     #swagger.responses[500] = {
       description: 'Failed to update book'
     }
  */
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await booksModel.updateBook(id, data);

    if (result === 0) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.status(200).json({ message: 'Book updated.' });
    }
  } catch {
    res.status(500).json({ error: 'Failed to update book.' });
  }
}

/**
 * Delete a book by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const deleteBook = async (req, res) => {
  /* #swagger.tags = ['Books']
     #swagger.summary = 'Delete a book by ID'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
     #swagger.responses[200] = {
       description: 'Book deleted successfully'
     }
     #swagger.responses[400] = {
       description: 'Invalid ID format'
     }
     #swagger.responses[404] = {
       description: 'Book not found'
     }
     #swagger.responses[500] = {
       description: 'Failed to delete book'
     }
  */
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }

    const bookId = new ObjectId(id);
    const wasDeleted = await booksModel.deleteBookById(bookId);

    if (!wasDeleted) {
      return res.status(404).json({ error: 'Book does not exist' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book', err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

/**
 * Render the update-book form with prefilled data
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function buildBooksForm(req, res) {
  const { id } = req.params || '';
  const formData = await booksModel.buildBooksForm(id);
  if (id) {
    res.render('./books/update-book', {
      title: 'Book Forms',
      fields: formData,
    });
  } else {
    res.render('./books/add-book', {
      title: 'Book Forms',
      fields: formData,
    });
  }
}

module.exports = {
  insertMultipleBooks,
  insertBook,
  getSingleBook,
  getAllBooks,
  updateBook,
  deleteBook,
  buildBooksForm,
};
