/*===============================================
File: index.js
Author: CSE 341 Group
Date: April 05, 2025
Purpose: This serves as place to store all generalized functions pertaining to the database.
  * Please note that this saves GENERAL and GENERIC functions. If a function serves a specific
  * route or controller, it should go in the models folder.
  * For example, a function that fetches all books from the database belings in the booksModel.js file.
===============================================*/

require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.DATABASE_URI;

let database;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/**
 * Ensure that the database connection is able to be established.
 */
async function testDatabaseConnection() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Successfully pinged the database');
  } catch (error) {
    console.log('There was a problem connecting to the database.', error);
  } finally {
    await client.close();
  }
}

testDatabaseConnection();

/**
 * Establish connection to the database
 * @returns Database object
 */
async function getDatabase() {
  if (!database) {
    await client.connect();
    database = client.db('ebookstore');
  }
  return database;
}

async function query(collection, filter = {}) {
  let results = [];
  try {
    const db = await getDatabase();
    results = await db.collection(collection).find(filter).toArray();
    console.log('Returned query', results);
  } catch (error) {
    console.log('There was a problem executing a query', error);
  }
  return results;
}

/**
 * Inserts multiple documents into a specified MongoDB collection.
 * @param {string} collection - The name of the collection.
 * @param {Array<Object>} data - An array of documents to insert.
 * @returns {Promise<Object>} A mapping of indexes to inserted document ObjectIds.
 */
async function insertMultipleItems(collection, data) {
  let insertedIds = [];
  try {
    const db = await getDatabase();
    const result = await db.collection(collection).insertMany(data);
    insertedIds = result.insertedIds;
  } catch (error) {
    console.log('There was a problem bulk inserting your data', error);
  }
  return insertedIds;
}

async function insertItem(collection, data) {
  const db = await getDatabase();
  const result = await db.collection(collection).insertOne(data);
  return result.insertedId;
}

/**
 * updates the mongodb object with data submitted
 */
async function updateById(collection, id, data) {
  try {
    const db = await getDatabase();
    // clean the data from all the empty values to avoid changing the database to null or empty strings
    const cleanData = {};
    for (const key in data) {
      if (data[key] !== null && data[key] !== '') {
        cleanData[key] = data[key];
      }
    }
    const result = await db
      .collection(collection)
      .updateOne({ _id: new ObjectId(id) }, { $set: cleanData });
    return result;
  } catch (error) {
    console.log('Error updating item:', error);
  }
}

/**
 * Delete an item from a collection given the item's ID
 * @param {string} collection The name of the collection
 * @param {ObjectId} id The id of a MongoDB object
 * @returns {boolean} Whether the operation was successful or not
 */
async function deleteById(collection, id) {
  try {
    const db = await getDatabase();
    const result = await db.collection(collection).deleteOne({ _id: id });
    return result.deletedCount > 0;
  } catch (error) {
    console.log('There was a problem deleting the item with id', id, error);
    return false;
  }
}

/**
 * Get dynamic form data from a collection by optional ID
 * @param {string} collection - The name of the collection
 * @param {string} [id] - Optional MongoDB document ID
 * @returns {Promise<Object|null>} - The document or null if not found
 */
async function getFormData(collection, id) {
  try {
    const db = await getDatabase();
    const query = id ? { _id: new ObjectId(id) } : {};
    const formData = await db.collection(collection).findOne(query);
    return formData;
  } catch (error) {
    console.log('Error getting form data:', error);
  }
}

module.exports = {
  testDatabaseConnection,
  insertMultipleItems,
  updateById,
  getFormData,
  deleteById,
  query,
  insertItem,
};
