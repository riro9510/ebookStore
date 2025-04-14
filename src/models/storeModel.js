const {
  insertMultipleItems,
  getFormData,
  deleteById,
  query,
  updateById,
  insertItem,
} = require('../database/');
/**
 * Creates a new cart (order) and inserts it into the 'order' collection.
 * @param {Object} orderData - The order object to insert
 * @param {string} orderData.userId - ID of the user who owns the order
 * @param {Object.<string, string>} orderData.books - An object where keys are book IDs and values are quantities
 * @param {number} orderData.totalPrice - Total price of the order
 * @returns {ObjectId} The ID of the newly created order document
 */
async function creatNewCart(orderData) {
  const result = await insertItem('order', orderData);
  return result;
}

async function getCartById(id) {
  const results = await query('order', { _id: id });
  return results[0] || null;
}
async function getAllCart() {
  const results = await query('order');
  return results;
}


function deleteCartById(id) {
  return deleteById('order', id);
}

async function completePurchase(cartId) {
  try {
    const cart = await getCartById(cartId); 
    const booksInCart = cart.books;  

    const bookPromises = Object.entries(booksInCart).map(([bookId, quantity]) => {
      return query('books', { _id: bookId });
    });

    const books = await Promise.all(bookPromises);

    const updateBookPromises = books.map((book, index) => {
      const bookId = book._id;
      const quantityToReduce = booksInCart[bookId];

      return updateBookStock(bookId, -quantityToReduce);
    });

    await Promise.all(updateBookPromises);

    await deleteCart(cartId);

    return { message: 'Purchase completed successfully' };

  } catch (error) {
    console.error('Error completing purchase:', error);
    throw new Error('Failed to complete the purchase');
  }
}
async function updateBookStock(bookId, quantityChange) {
  const result = await query('books', { _id: bookId }, { $inc: { stock: quantityChange } });
  return result;
}


async function updateCart(id, data) {
  const result = await updateById('order', id, data);
  return result.matchedCount;
}

module.exports = {
  creatNewCart,
  getAllCart,
  updateCart,
  getCartById,
  deleteCartById,
  completePurchase
};
