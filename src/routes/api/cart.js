const router = require('express').Router();
const cartController = require('../../controllers/cartController');
const { validateJoiSchema } = require('../../middleware/validator');
const { cartSchema } = require('../../schemas/cartSchema');

router.post('/', validateJoiSchema(cartSchema), cartController.createNewCart);
router.put('/:id', cartController.updateCart);
router.get('/:id', cartController.getSingleCartById);
router.get('/', cartController.getAllCart);
// router.post('/:id', cartController.completePurchase);
router.delete('/:id', cartController.deleteCart);

module.exports = router;
