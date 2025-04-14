const router = require('express').Router();
const storeController = require('../controllers/storeController');
const { isAuthenticated } = require('../middleware/authenticate');
const { validateJoiSchema } = require('../middleware/validator');
const { cartSchema} = require('../schemas/storeSchema');

router.post(
  '/',
  isAuthenticated,
  validateJoiSchema(cartSchema),
  storeController.createNewCart
);
router.put('/:id', isAuthenticated, storeController.updateCart);
router.get('/:id', isAuthenticated, storeController.getSingleCartById);
router.post('/:id', isAuthenticated,storeController.completePurchase);
router.delete('/:id', isAuthenticated, storeController.deteleCart);

module.exports = router;
