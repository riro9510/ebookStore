const Joi = require('joi');

/**
 * Schema for a single user registration
 * @type {Joi.ObjectSchema}
 */
const registerUserSchema = Joi.object({
  username: Joi.string().required().example('TestUser'),
  password: Joi.string().required().example('ThisIsAPassword'),
  email: Joi.string().email().required().example('example@test.com'),
  shipping_address: Joi.object({
    street: Joi.string().required().example('123 Roosevelt Lane'),
    city: Joi.string().required().example('Anchorage'),
    state: Joi.string().required().example('AK'),
    zip: Joi.string()
      .pattern(/^\d{5}(-\d{4})?$/)
      .required()
      .example('99501'),
  }).required(),
});

/**
 * Schema for registering multiple users
 * @type {Joi.ArraySchema}
 */
const registerManyUsersSchema = Joi.array()
  .items(registerUserSchema)
  .min(1)
  .required();

module.exports = {
  registerUserSchema,
  registerManyUsersSchema,
};
