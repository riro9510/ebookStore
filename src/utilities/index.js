const { ObjectId } = require('mongodb');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.status = 400;
  }
}

/**
 * Validates and converts a string into an ObjectId
 * @param {string} id
 * @returns {ObjectId}
 * @throws {BadRequestError} if id is invalid
 */
function validateObjectId(id) {
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError('Invalid ID format');
  }
  return new ObjectId(id);
}

module.exports = { validateObjectId };
