const cartsModel = require('../models/cartsModel.js');
const { ObjectId } = require('mongodb');
const { validateObjectId } = require('../utilities/index');

async function createNewCart(req, res) {
  /* 
  #swagger.tags = ["Store"]
  #swagger.summary = "Create a new cart"
  #swagger.parameters['body'] = {
    "in": "body",
    "required": true,
    "schema": { "$ref": "#/definitions/Cart" }
  }
  #swagger.responses[201] = {
    "description": "Cart created successfully",
    "schema": { "id": "ObjectId" }
  }
  #swagger.responses[500] = {
    "description": "Failed to add books"
  }
  */
  try {
    const cartItems = req.body;
    const newcartId = await cartsModel.creatNewCart(cartItems);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ _id: newcartId });
  } catch {
    res.status(500).json({ error: 'Failed to add books' });
  }
}

const getSingleCartById = async (req, res, next) => {
  /* 
  #swagger.tags = ["Store"]
  #swagger.summary = "Get a single cart by ID"
  #swagger.parameters['id'] = {
    "in": "path",
    "required": true,
    "type": "string",
    "description": "Cart ID"
  }
  #swagger.responses[200] = {
    "description": "Cart retrieved successfully",
    "schema": { "$ref": "#/definitions/Cart" }
  }
  #swagger.responses[404] = {
    "description": "Cart not found"
  }
  #swagger.responses[500] = {
    "description": "Internal server error"
  }
  */
  try {
    const cartId = validateObjectId(req.params.id);
    const result = await cartsModel.getCartById(cartId);

    if (!result) {
      const err = new Error('cart not found');
      err.status = 404;
      throw err;
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieves all items currently stored in the cart.
 * Sends a 200 response with the list if found, or a 404 error if not.
 * Forwards any internal errors to the error handler middleware.
 */
const getAllCart = async (req, res, next) => {
  /* 
    #swagger.tags = ["Store"]
    #swagger.summary = "Retrieve all items in the cart"
    #swagger.responses[200] = {
      "description": "Returns a list of all cart items",
      "schema": [{ "$ref": "#/definitions/Cart" }]
    }
    #swagger.responses[404] = {
      "description": "Cart not found"
    }
    #swagger.responses[500] = {
      "description": "Internal server error"
    }
  */
  try {
    const result = await cartsModel.getAllCart();

    if (!result) {
      const err = new Error('cart not found');
      err.status = 404;
      throw err;
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * Updates a specific cart with new data using its ID.
 * Returns 200 on success, 404 if not found, or 500 on error.
 */
async function updateCart(req, res) {
  /* 
    #swagger.tags = ["Store"]
    #swagger.summary = "Update a cart by ID"
    #swagger.parameters['body'] = {
      "in": "body",
      "required": true,
      "schema": { "$ref": "#/definitions/Cart" }
    }
    #swagger.responses[200] = {
      "description": "Cart updated successfully",
      "schema": { "message": "Cart updated." }
    }
    #swagger.responses[404] = {
      "description": "Cart not found"
    }
    #swagger.responses[500] = {
      "description": "Failed to update the cart"
    }
  */
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await cartsModel.updateCart(id, data);

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
const deleteCart = async (req, res) => {
  /* 
    #swagger.tags = ["Store"]
    #swagger.summary = "Delete a cart by ID"
    #swagger.responses[200] = {
      "description": "Cart deleted successfully",
      "schema": { "message": "Cart deleted successfully" }
    }
    #swagger.responses[400] = {
      "description": "Invalid id format"
    }
    #swagger.responses[404] = {
      "description": "Cart does not exist"
    }
    #swagger.responses[500] = {
      "description": "Failed to delete cart"
    }
  */
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }

    const cartId = new ObjectId(id);
    const wasDeleted = await cartsModel.deleteCartById(cartId);

    if (!wasDeleted) {
      return res.status(404).json({ error: 'Cart does not exist' });
    }

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (err) {
    console.error('Error deleting cart', err);
    res.status(500).json({ error: 'Failed to delete cart' });
  }
};

/**
 * Completes the purchase for a given cart ID.
 * Returns the finalized purchase data or appropriate error response.
 */
const completePurchase = async (req, res) => {
  /* 
    #swagger.tags = ["Store"]
    #swagger.summary = "Complete a purchase by cart ID"
    #swagger.responses[200] = {
      "description": "Purchase completed successfully",
      "schema": { "$ref": "#/definitions/Purchase" }
    }
    #swagger.responses[400] = {
      "description": "Invalid id format"
    }
    #swagger.responses[500] = {
      "description": "Failed to complete the purchase"
    }
  */
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }

    const cartId = new ObjectId(id);
    const purchase = await cartsModel.completePurchase(cartId);

    return res.status(200).json(purchase);
  } catch (err) {
    console.error('Error completing purchase', err);
    res.status(500).json({ error: 'Failed to complete the purchase' });
  }
};

module.exports = {
  createNewCart,
  getAllCart,
  getSingleCartById,
  updateCart,
  deleteCart,
  completePurchase,
};
