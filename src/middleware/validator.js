/**
 * Middleware for validating a request body against a Joi schema
 * @param {import('joi').ObjectSchema} schema - A Joi validation schema
 * @ On error, responds with an object containing a list of errors.
 */
function validateJoiSchema(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((detail) => detail.message) });
    }

    req.body = value;
    next();
  };
}

module.exports = { validateJoiSchema };
