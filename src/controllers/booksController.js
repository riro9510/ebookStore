// const { object } = require('joi');
const booksModel = require('../models/booksModel');
const { ObjectId } = require('mongodb');
const { validateObjectId } = require('../utilities/index');
async function insertMultipleBooks(req, res) {
  try {
    const booksList = req.body;
    const newBookIds = await booksModel.insertMultipleBooks(booksList);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ newBookIds: newBookIds });
  } catch {
    res.status(500).json({ error: 'Failed to add books' });
  }
}
/**
 * controller function to get books in the db by id.
 */
const getSingleBook = async (req, res, next) => {
  try {
    // check if the given id is a valid db item
    const bookId = validateObjectId(req.params.id);
    const result = await booksModel.getBookById(bookId);

    //if book is not found, respond with error code 404
    if (!result) {
      const err = new Error('Book not found');
      err.status = 404;
      throw err;
    }

    // if book is found, respond with book data
    res.status(200).json(result);
  } catch (err) {
    // catch and log any unexpected errors respond with 500
    next(err);
  }
};

/**
 * controller function to get all books from the database
 */
const getAllBooks = async (req, res, next) => {
  try {
    const books = await booksModel.getAllBooks();

    if (books.length === 0) {
      const err = new Error('No books found');
      err.status = 404;
      throw err;
    }

    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

/**
 * update item in the db based on id and collection
 */
async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await booksModel.updateBook(id, data);
    if (result === 0) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.status(201).json({ message: 'Book updated.' });
    }
  } catch {
    res.status(500).json({ error: 'Failed to update book.' });
  }
}
/**
 * controller function to delete a book by id
 */
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    //validate the ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }
    const bookId = new ObjectId(id);

    //call the model fuction to delete book
    const wasDeleted = await booksModel.deleteBookById(bookId);

    //if no book was deleted, return 404
    if (!wasDeleted) {
      return res.status(404).json({ error: 'Book does not exist' });
    }
    // if is deleted
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book', err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

async function buildBooksForm(req, res) {
  const { id } = req.params;
  const formData = await booksModel.buildBooksForm(id);
  res.render('./books/update-book', {
    title: 'Change Book Info',
    fields: formData,
  });
}

module.exports = {
  insertMultipleBooks,
  getSingleBook,
  getAllBooks,
  updateBook,
  deleteBook,
  buildBooksForm,
};
