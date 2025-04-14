const Joi = require('joi');

/**
 * Schema for a review
 * @type {Joi.ObjectSchema}
 */
const reviewSchema = Joi.object({
  title: Joi.string()
    .required()
    .example('Excellent read'),

  comment: Joi.string()
    .required()
    .example('I really enjoyed the character development and plot.'),

  rating: Joi.number()
    .min(0)
    .max(5)
    .required()
    .example(4.5),

  author: Joi.string() 
    .required()
    .example('609e12672f8fb814c89f9e3b'),

  bookId: Joi.string()
    .required()
    .example('609e127b2f8fb814c89f9e3d'),
});


module.exports = {
  reviewSchema,
};
