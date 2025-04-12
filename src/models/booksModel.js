const {
  insertMultipleItems,
  getFormData,
  deleteById,
  query,
  updateById,
  insertItem,
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

async function insertBook(bookData) {
  const insertedId = await insertItem('books', bookData);
  return insertedId;
}

/**
 * get book by id in the db collection
 */
async function getBookById(id) {
  const results = await query('books', { _id: id });
  return results[0] || null;
}

/**
 * Get all books in the database
 * @returns {Promise<Array>} A list of books
 */
async function getAllBooks() {
  return await query('books');
}

/**
 * model function to delete a book by id from the books collection
 */
function deleteBookById(id) {
  return deleteById('books', id);
}

/**
 * update item in the db based on id and collection
 */
async function updateBook(id, data) {
  const result = await updateById('books', id, data);
  return result.matchedCount;
}


async function buildBooksForm(id = null) {
  const formData = await getFormData('books', id);
  return formData;
}

module.exports = {
  insertMultipleBooks,
  insertBook,
  updateBook,
  buildBooksForm,
  getBookById,
  getAllBooks,
  deleteBookById,
};
