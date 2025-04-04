const { insertMultipleItems, updateItem } = require('../database/')

/**
 * Insert multiple books into the mongoDB database
 * @param {Array<Object>} dataList A list of book objects
 * @returns {Array<ObjectId>} A list of the ids of the books that were inserted
 */
async function insertMultipleBooks(dataList) {
  const insertedIds = await insertMultipleItems('books', dataList)
  return Object.values(insertedIds)
}

/**
 * update item in the db based on id and collection
 */
async function updateBook(id, data) {
  const result = await updateItem('books', id, data)
  return result.matchedCount
}

module.exports = { insertMultipleBooks, updateBook }
