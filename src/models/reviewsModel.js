const {
    insertItem,
    query,
    deleteById,
    updateById,
  } = require('../database/');
  
  /**
   * Create a new review'.
   * @param {Object} reviewData - Data of review
   * @param {string} reviewData.title - Title
   * @param {string} reviewData.comment - Comment
   * @param {number} reviewData.rating - Score (0-5)
   * @param {string} reviewData.author - User ID
   * @param {string} reviewData.bookId - Book ID
   * @returns {ObjectId} - ID review
   */
  async function createReview(reviewData) {
    const result = await insertItem('reviews', reviewData);
    return result;
  }
  
  /**
   * @param {string} id - Review Id
   * @returns {Object|null}
   */
  async function getReviewById(id) {
    const results = await query('reviews', { _id: id });
    return results[0] || null;
  }
  
  /**
   * get all reviews
   * @returns {Array<Object>}
   */
  async function getAllReviews() {
    const results = await query('reviews');
    return results;
  }
  
  /**
   * Update by ID.
   * @param {string} id - Review Id
   * @param {Object} data - Data to Update
   */
  async function updateReviewById(id, data) {
    const result = await updateById('reviews', id, data);
    return result.modifiedCount;
  }
  
  /**
   * Delete by ID.
   * @param {string} id - Review Id
   */
  async function deleteReviewById(id) {
    const result = await deleteById('reviews', id);
    return result.deletedCount;
  }
  
  module.exports = {
    createReview,
    getReviewById,
    getAllReviews,
    updateReviewById,
    deleteReviewById,
  };
  