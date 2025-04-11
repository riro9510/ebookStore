const router = require('express').Router();
const usersController = require('../controllers/usersController');
const usersSchema = require('../schemas/usersSchema');
const { validateJoiSchema } = require('../middleware/validator');
const {isAuthenticated} = require("../middleware/authentificate.js");
const passport = require('passport');

// GET routes
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);

// POST routes
router.post(
  '/',
  isAuthenticated,
  validateJoiSchema(usersSchema.registerUserSchema),
  usersController.createUser
);

router.post(
  '/bulk',
  isAuthenticated,
  validateJoiSchema(usersSchema.registerManyUsersSchema),
  usersController.createMultipleUsers
);

// PUT route
router.put('/:id',isAuthenticated, usersController.updateUserById);

// DELETE route
router.delete('/:id',isAuthenticated,usersController.deleteUserById);

module.exports = router;
