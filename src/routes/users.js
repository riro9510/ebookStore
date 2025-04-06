const router = require('express').Router();
const usersController = require('../controllers/usersController');
const usersSchema = require('../schemas/usersSchema');
const { validateJoiSchema } = require('../middleware/validator');

router.get('/:id', usersController.getUserById);
router.get('/', usersController.getAllUsers);
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
router.put('/:id', usersController.updateUserById);
router.delete('/:id', usersController.deleteUserById);

module.exports = router;
