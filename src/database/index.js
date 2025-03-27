require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = process.env.DATABASE_URI

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

/**
 * Ensure that the database connection is able to be established.
 */
async function testDatabaseConnection () {
  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    console.log('Successfully pinged the database')
  } catch (error) {
    console.log('There was a problem connecting to the database.', error)
  } finally {
    await client.close()
  }
}

testDatabaseConnection()

/**
 * Inserts multiple documents into a specified MongoDB collection.
 * @param {string} collection - The name of the collection.
 * @param {Array<Object>} data - An array of documents to insert.
 * @returns {Promise<Object>} A mapping of indexes to inserted document ObjectIds.
 */
async function insertMultipleItems(collection, data) {
  let insertedIds = []
  try {
    await client.connect()
    const db = client.db('ebookstore').collection(collection)
    insertedIds = (await db.insertMany(data)).insertedIds
  } catch (error) {
    console.log('There was a problem bulk inserting your data', error)
  } finally {
    await client.close()
  }
  return insertedIds
}

module.exports = { testDatabaseConnection, insertMultipleItems }