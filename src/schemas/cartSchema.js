const Joi = require('joi');

/**
 * Schema for validating cart/order objects
 * @type {Joi.ObjectSchema}
 */
const cartSchema = Joi.object({
  userId: Joi.string().required().example('643a6b29f3d5b8d2d8e4d531'),
  books: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .required()

    .example({
      id: '643a6b29f3d5b8d2d8e4d531',
      Quantity: 1,
    }),
  totalPrice: Joi.number().min(0).required().example(49.98),
});

module.exports = { cartSchema };
