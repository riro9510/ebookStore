const {
  // insertMultipleItems,
  deleteById,
  query,
  updateById,
  insertItem,
  insertMultipleItems,
} = require('../database/');

async function createUser(userData) {
  const id = insertItem('users', userData);
  return id;
}

async function createManyUsers(usersList) {
  const insertedIds = await insertMultipleItems('users', usersList);
  return Object.values(insertedIds);
}

async function getUserById(id) {
  const result = await query('users', { _id: id });
  return result[0] || null;
}

async function getAllUsers() {
  const results = await query('users');
  return results;
}

async function deleteUserById(id) {
  const result = await deleteById('users', id);
  return result;
}

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
