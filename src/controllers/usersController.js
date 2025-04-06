const usersModel = require('../models/usersModel');
const { validateObjectId } = require('../utilities');

async function createUser(req, res, next) {
  try {
    const userId = await usersModel.createUser(req.body);
    res.status(201).json({ id: userId });
  } catch (err) {
    next(err);
  }
}

async function createMultipleUsers(req, res) {
  try {
    const usersList = req.body;
    const newUsersIds = await usersModel.createManyUsers(usersList);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ newUsersIds: newUsersIds });
  } catch {
    res.status(500).json({ error: 'Failed to add users' });
  }
}

async function deleteUserById(req, res, next) {
  try {
    const userId = validateObjectId(req.params.id);
    const success = await usersModel.deleteUserById(userId);

    if (!success) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const userId = validateObjectId(req.params.id);
    const results = await usersModel.getUserById(userId);

    if (!results) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }

    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const results = await usersModel.getAllUsers();

    if (results.length < 1) {
      const err = new Error('No users found');
      err.status = 404;
      throw err;
    }

    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
}

async function updateUserById(req, res, next) {
  try {
    const userId = validateObjectId(req.params.id);
    const success = await usersModel.updateUserById(userId, req.body);

    if (!success) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  createMultipleUsers,
  deleteUserById,
  getUserById,
  getAllUsers,
  updateUserById,
};
