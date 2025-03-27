const { insertMultipleItems } = require('../database/')

/**
 * Insert multiple books into the mongoDB database
 * @param {Array<Object>} dataList A list of book objects
 * @returns {Array<ObjectId>} A list of the ids of the books that were inserted 
 */
async function insertMultipleBooks (dataList) {
  const insertedIds = await insertMultipleItems('books', dataList)
  return Object.values(insertedIds)
}

module.exports = { insertMultipleBooks }