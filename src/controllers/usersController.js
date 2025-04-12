const usersModel = require('../models/usersModel');
const { validateObjectId } = require('../utilities');

/**
 * Create a new user from request body
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function createUser(req, res, next) {
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Register a user'
     #swagger.parameters['body'] = {
        in: 'body',
        required: 'true',
        schema: { $ref: '#/definitions/Users' }
     }
  */
  try {
    const userId = await usersModel.createUser(req.body);
    res.status(201).json({ _id: userId });
  } catch (err) {
    next(err);
  }
}

/**
 * Create multiple users from an array in request body
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function createMultipleUsers(req, res) {
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Register multiple users'
     #swagger.parameters['body'] = {
        in: 'body',
        required: 'true',
        schema: [{ $ref: '#/definitions/Users' }]
     }
  */
  try {
    const usersList = req.body;
    const newUsersIds = await usersModel.createManyUsers(usersList);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ newUsersIds: newUsersIds });
  } catch {
    res.status(500).json({ error: 'Failed to add users' });
  }
}

/**
 * Delete a user by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function deleteUserById(req, res, next) {
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Delete a user given their ID'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
  */
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

/**
 * Get a user by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function getUserById(req, res, next) {
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get a user given their ID'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
  */
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

/**
 * Get all users from the database
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function getAllUsers(req, res, next) {
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get all users in the database'
  */
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

/**
 * Update a user by ID with fields from request body
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function updateUserById(req, res, next) {
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Update a user by ID'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/Users' }
     }
  */
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
