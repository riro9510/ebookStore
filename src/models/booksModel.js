const { deleteBook, getSingle } = require('../controllers/booksController');

const {
  insertMultipleItems,
  updateItem,
  getFormData,
  getDb,
} = require('../database/');

/**
 * Insert multiple books into the mongoDB database
 * @param {Array<Object>} dataList A list of book objects
 * @returns {Array<ObjectId>} A list of the ids of the books that were inserted
 */
async function insertMultipleBooks(dataList) {
  const insertedIds = await insertMultipleItems('books', dataList);
  return Object.values(insertedIds);
}
/**
 * get book by id in the db collection
 */
async function getBookById(id) {
  const db = await getDb();
  return await db.collection('books').findOne({ _id: id });
}
//model function to get all books from the books collection
async function getAllBooks() {
  try {
    //connect to the database
    const db = await getDb();
    //query the collection and convert the result to an array
    const books = await db.collection('books').find({}).toArray();
    return books;
  } catch (err) {
    //log and re-throw errors so they can be handed by the controller
    console.error('Error fetching all books:', err);
    throw err;
  }
}
/**
 * model function to delete a book by id from the books collection
 */
async function deleteBookById(id) {
  try {
    const db = await getDb();
    const result = await db.collection('books').deleteOne({ _id: id });
    return result;
  } catch (err) {
    console.error('Error deleting book', err);
    throw err;
  }
}

/**
 * update item in the db based on id and collection
 */
async function updateBook(id, data) {
  const result = await updateItem('books', id, data);
  return result.matchedCount;
}

async function buildBooksForm(id = null) {
  const formData = await getFormData('books', id);
  return formData;
}

module.exports = {
  insertMultipleBooks,
  updateBook,
  buildBooksForm,
  getBookById,
  getSingle,
  getAllBooks,
  deleteBook,
  deleteBookById,
};
