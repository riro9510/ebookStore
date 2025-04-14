const router = require('express').Router();
const storeController = require('../controllers/storeController');
const { isAuthenticated } = require('../middleware/authenticate');
const { validateJoiSchema } = require('../middleware/validator');
const { cartSchema} = require('../schemas/storeSchema');

router.post(
  '/',

  validateJoiSchema(cartSchema),
  storeController.createNewCart
);
router.put('/:id', storeController.updateCart);
router.get('/:id', storeController.getSingleCartById);
router.get('/', storeController.getAllCart);
router.post('/:id',storeController.completePurchase);
router.delete('/:id', storeController.deteleCart);

module.exports = router;
