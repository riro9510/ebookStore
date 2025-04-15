const router = require('express').Router();
const usersController = require('../../controllers/usersController');
const { validateJoiSchema } = require('../../middleware/validator');
const { isAuthenticated } = require('../../middleware/authenticate');
const {
  registerUserSchema,
  registerManyUsersSchema,
} = require('../../schemas/usersSchema');

// Create users
router.post(
  '/',
  isAuthenticated,
  validateJoiSchema(registerUserSchema),
  usersController.createUser
);
router.post(
  '/bulk',
  isAuthenticated,
  validateJoiSchema(registerManyUsersSchema),
  usersController.createMultipleUsers
);

// Read users
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);

// Update user
router.put('/:id', isAuthenticated, usersController.updateUserById);

// Delete user
router.delete('/:id', isAuthenticated, usersController.deleteUserById);

module.exports = router;
