const storeModel = require('../models/storeModel');
const { ObjectId } = require('mongodb');
const { validateObjectId } = require('../utilities/index');

/**
 * Create a new cart
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * 
 * #swagger.tags = ['Cart']
 * #swagger.summary = 'Create a new shopping cart'
 * #swagger.description = 'Creates a new cart in the system with the provided cart items.'
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   required: true,
 *   schema: {
 *     type: 'object',
 *     properties: {
 *       userId: { type: 'string' },
 *       books: {
 *         type: 'object',
 *         additionalProperties: { type: 'integer' },
 *         example: {
 *           "bookId123": 1,
 *           "bookId456": 2
 *         }
 *       },
 *       totalPrice: { type: 'number' }
 *     },
 *     required: ['userId', 'books', 'totalPrice']
 *   }
 * }
 * #swagger.responses[201] = {
 *   description: 'Cart created successfully',
 *   schema: {
 *     message: 'Cart created successfully',
 *     idCart: 'ObjectId'
 *   }
 * }
 * #swagger.responses[400] = {
 *   description: 'Invalid cart data format',
 *   schema: {
 *     error: 'Invalid data provided for the cart.'
 *   }
 * }
 * #swagger.responses[500] = {
 *   description: 'Failed to create cart',
 *   schema: {
 *     error: 'Internal server error'
 *   }
 * }
 */
async function createNewCart(req, res) {

  try {
    const cartItems = req.body;
    const newcartId = await storeModel.creatNewCart(cartItems);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(Object.values(newcartId));
  } catch {
    res.status(500).json({ error: 'Failed to add books' });
  }
}

/**
 * Get a single cart by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getSingleCartById = async (req, res, next) => {
  try {
    const cartId = validateObjectId(req.params.id);
    const result = await storeModel.getCartById(cartId);

    if (!result) {
      const err = new Error('cart not found');
      err.status = 404;
      throw err;
    }

    res.status(200).render('./cart/cart-detail', {
      title: 'Cart details',
      result,
    });
  } catch (err) {
    next(err);
  }
};

async function updateCart(req, res) {
   /* 
    #swagger.tags = ['Cart']
    #swagger.summary = 'Update a cart by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'ID of the cart to update'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          books: {
            type: 'object',
            additionalProperties: { type: 'integer' },
            example: {
              "bookId123": 1,
              "bookId456": 2
            }
          },
          totalPrice: { type: 'number' }
        },
        required: ['userId', 'books', 'totalPrice']
      }
    }
    #swagger.responses[200] = {
      description: 'Cart updated successfully',
      schema: {
        message: 'Cart updated.'
      }
    }
    #swagger.responses[404] = {
      description: 'Cart not found',
      schema: {
        error: 'Cart not found'
      }
    }
    #swagger.responses[500] = {
      description: 'Failed to update the cart',
      schema: {
        error: 'Failed to update the cart.'
      }
    }
  */

  try {
    const { id } = req.params;
    const data = req.body;
    const result = await storeModel.updateCart(id, data);

    if (result === 0) {
      res.status(404).json({ error: 'Cart not found' });
    } else {
      res.status(200).json({ message: 'Cart updated.' });
    }
  } catch {
    res.status(500).json({ error: 'Failed to update the cart.' });
  }
}

/**
 * Delete a cart by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const deteleCart = async (req, res) => {
  /* 
  #swagger.tags = ['Cart']
  #swagger.summary = 'Delete a cart by ID'
  #swagger.description = 'Deletes a cart from the database using its ID.'
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'The ID of the cart to delete'
  }
  #swagger.responses[200] = {
    description: 'Cart deleted successfully',
    schema: {
      message: 'Cart deleted'
    }
  }
  #swagger.responses[400] = {
    description: 'Invalid ID format',
    schema: {
      error: 'Invalid cart ID format'
    }
  }
  #swagger.responses[404] = {
    description: 'Cart not found',
    schema: {
      error: 'Cart not found'
    }
  }
  #swagger.responses[500] = {
    description: 'Failed to delete cart',
    schema: {
      error: 'Internal server error'
    }
  }
*/

  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }

    const cartId = new ObjectId(id);
    const wasDeleted = await storeModel.deleteCartById(cartId);

    if (!wasDeleted) {
      return res.status(404).json({ error: 'Cart does not exist' });
    }

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (err) {
    console.error('Error deleting cart', err);
    res.status(500).json({ error: 'Failed to delete cart' });
  }
};

const completePurchase = async (req, res) =>{
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }

    const cartId = new ObjectId(id);
    const purchase = await storeModel.completePurchase(cartId);

    return res.status(200).json(purchase);
  } catch (err) {
    console.error('Error completing purchase', err);
    res.status(500).json({ error: 'Failed to complete the purchase' });
  }
}
module.exports = {
  createNewCart,
  getSingleCartById,
  updateCart,
  deteleCart,
};
