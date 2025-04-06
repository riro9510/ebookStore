const router = require('express').Router();
const usersController = require('../controllers/usersController');
const usersSchema = require('../schemas/usersSchema');
const { validateJoiSchema } = require('../middleware/validator');

// GET routes
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);

// POST routes
router.post(
  '/',
  validateJoiSchema(usersSchema.registerUserSchema),
  usersController.createUser
);

router.post(
  '/bulk',
  validateJoiSchema(usersSchema.registerManyUsersSchema),
  usersController.createMultipleUsers
);

// PUT route
router.put('/:id', usersController.updateUserById);

// DELETE route
router.delete('/:id', usersController.deleteUserById);

module.exports = router;
