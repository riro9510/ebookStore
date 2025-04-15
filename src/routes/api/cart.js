const router = require('express').Router();
const cartController = require('../../controllers/cartController');
const { validateJoiSchema } = require('../../middleware/validator');
const { cartSchema } = require('../../schemas/cartSchema');
const { isAuthenticated } = require('../../middleware/authenticate');

router.post('/', isAuthenticated, validateJoiSchema(cartSchema), cartController.createNewCart);
router.put('/:id', isAuthenticated, cartController.updateCart);
router.get('/:id', cartController.getSingleCartById);
router.get('/', cartController.getAllCart);
// router.post('/:id', cartController.completePurchase);
router.delete('/:id', isAuthenticated, cartController.deleteCart);

module.exports = router;
