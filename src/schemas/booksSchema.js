const Joi = require('joi');

/**
 * Schema for validating book objects
 * @type {Joi.ObjectSchema}
 */
const bookSchema = Joi.object({
  title: Joi.string().required().example('The Silent Shore'),
  author: Joi.string().required().example('Elaine Morgan'),
  stock: Joi.number().optional().example(3),
  pages: Joi.number().required().example(310),
  description: Joi.string()
    .required()
    .example(
      'A gripping tale of survival and secrets on a desolate coastline.'
    ),
  genre: Joi.string().required().example('Mystery'),
  tags: Joi.array()
    .items(Joi.string())
    .required()
    .example(['suspense', 'thriller', 'coastal']),
  price: Joi.number().required().example(14.99),
});

module.exports = { bookSchema };
