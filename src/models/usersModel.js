const {
  deleteById,
  query,
  updateById,
  insertItem,
  insertMultipleItems,
} = require('../database/');

/**
 * Insert a single user into the database
 * @param {Object} userData - The user data to insert
 * @returns {Promise<ObjectId>} The inserted user's ID
 */
async function createUser(userData) {
  const id = await insertItem('users', userData);
  return id;
}

/**
 * Insert multiple users into the database
 * @param {Array<Object>} usersList - List of users to insert
 * @returns {Promise<Array<ObjectId>>} List of inserted user IDs
 */
async function createManyUsers(usersList) {
  const insertedIds = await insertMultipleItems('users', usersList);
  return Object.values(insertedIds);
}

/**
 * Retrieve a single user by ID
 * @param {ObjectId} id - The user ID
 * @returns {Promise<Object|null>} The user object or null if not found
 */
async function getUserById(id) {
  const result = await query('users', { _id: id });
  return result[0] || null;
}

/**
 * Retrieve all users from the database
 * @returns {Promise<Array<Object>>} Array of user objects
 */
async function getAllUsers() {
  const results = await query('users');
  return results;
}

/**
 * Delete a user by ID
 * @param {ObjectId} id - The user ID
 * @returns {Promise<boolean>} True if deleted, false otherwise
 */
async function deleteUserById(id) {
  const result = await deleteById('users', id);
  return result;
}

/**
 * Update a user by ID with the given data
 * @param {ObjectId} id - The user ID
 * @param {Object} data - Fields to update
 * @returns {Promise<boolean>} True if matched and modified, false otherwise
 */
async function updateUserById(id, data) {
  const result = await updateById('users', id, data);
  return result.matchedCount > 0 && result.modifiedCount > 0;
}

module.exports = {
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
  getAllUsers,
  createManyUsers,
};
