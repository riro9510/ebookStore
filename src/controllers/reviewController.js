const reviewModel = require('../models/reviewsModel');
const { reviewSchema } = require('../schemas/reviewSchema');
const { ObjectId } = require('mongodb');
const { validateObjectId } = require('../utilities/index');

/**
 * Create a new review
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 *
 * #swagger.tags = ['Review']
 * #swagger.summary = 'Create a new book review'
 * #swagger.description = 'Creates a new review in the system with the provided review data.'
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   required: true,
 *   schema: {
 *     type: 'object',
 *     properties: {
 *       title: { type: 'string' },
 *       comment: { type: 'string' },
 *       rating: { type: 'number', minimum: 0, maximum: 5 },
 *       author: { type: 'string' },
 *       bookId: { type: 'string' }
 *     },
 *     required: ['title', 'comment', 'rating', 'author', 'bookId']
 *   }
 * }
 * #swagger.responses[201] = {
 *   description: 'Review created successfully',
 *   schema: {
 *     message: 'Review created successfully',
 *     id: 'ObjectId'
 *   }
 * }
 * #swagger.responses[400] = {
 *   description: 'Invalid review data',
 *   schema: {
 *     error: 'Invalid data provided for the review.'
 *   }
 * }
 * #swagger.responses[500] = {
 *   description: 'Failed to create review',
 *   schema: {
 *     error: 'Internal server error'
 *   }
 * }
 */
const createReview = async (req, res) => {
  try {
    const { error, value } = reviewSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await reviewModel.createReview(value);
    const { bookId } = value;

    res.status(201).redirect(`/books/${bookId}`);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

/**
 * Get a single review by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getReviewById = async (req, res) => {
  try {
    const reviewId = validateObjectId(req.params.id);
    const review = await reviewModel.getReviewById(reviewId);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (err) {
    console.error('Error fetching review:', err);
    res.status(500).json({ error: 'Failed to retrieve review' });
  }
};

/**
 * Get all reviews
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.getAllReviews();
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
};

/**
 * Update a review by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const updateData = req.body;
    const result = await reviewModel.updateReviewById(id, updateData);

    if (result === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json({ message: 'Review updated successfully' });
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).json({ error: 'Failed to update review' });
  }
};

/**
 * Delete a review by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const deletedCount = await reviewModel.deleteReviewById(id);

    if (!deletedCount) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

module.exports = {
  createReview,
  getReviewById,
  getAllReviews,
  updateReview,
  deleteReview,
};
