const reviewModel = require('../models/reviewsModel');
const { validateObjectId } = require('../utilities/index');

/**
 * Create a new review
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const createReview = async (req, res, next) => {
  /* 
    #swagger.tags = ["Reviews"]
    #swagger.summary = "Create a new review"
    #swagger.parameters['body'] = {
      "in": "body",
      "required": true,
      "schema": { "$ref": "#/definitions/Review" }
    }

    #swagger.responses[201] = {
      "description": "Review created successfully",
      "schema": { "_id": "ObjectId" }
    }
    #swagger.responses[400] = {
      "description": "Validation error"
    }
    #swagger.responses[500] = {
      "description": "Failed to create review"
    }
  */
  try {
    const reviewData = req.body;
    // const newReviewId = await reviewModel.createReview(reviewData);
    // res.status(201).json({ _id: newReviewId });
    await reviewModel.createReview(reviewData);
    const { bookId } = reviewData;

    res.status(201).redirect(`/books/${bookId}`);
  } catch (err) {
    next(err);
  }
};

/**
 * Get a single review by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getReviewById = async (req, res, next) => {
  /* 
    #swagger.tags = ["Reviews"]
    #swagger.summary = "Get a single review by ID"
    #swagger.responses[200] = {
      "description": "Review retrieved successfully",
      "schema": { "$ref": "#/definitions/Review" }
    }
    #swagger.responses[404] = {
      "description": "Review not found"
    }
    #swagger.responses[500] = {
      "description": "Failed to retrieve review"
    }
  */
  try {
    const reviewId = validateObjectId(req.params.id);
    const review = await reviewModel.getReviewById(reviewId);

    if (!review) {
      const err = new Error('Review not found');
      err.status = 404;
      throw err;
    }

    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};

/**
 * Get all reviews
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getAllReviews = async (req, res) => {
  /* 
    #swagger.tags = ["Reviews"]
    #swagger.summary = "Get all reviews"
    #swagger.responses[200] = {
      "description": "Reviews retrieved successfully",
      "schema": [{ "$ref": "#/definitions/Review" }]
    }
    #swagger.responses[500] = {
      "description": "Failed to retrieve reviews"
    }
  */
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
const updateReview = async (req, res, next) => {
  /* 
    #swagger.tags = ["Reviews"]
    #swagger.summary = "Update a review by ID"
    #swagger.parameters['body'] = {
      "in": "body",
      "required": true,
      "schema": { "$ref": "#/definitions/Review" }
    }
    #swagger.responses[204] = {
      "description": "Review updated successfully",
    }
    #swagger.responses[400] = {
      "description": "Invalid ID format"
    }
    #swagger.responses[404] = {
      "description": "Review not found"
    }
    #swagger.responses[500] = {
      "description": "Failed to update review"
    }
  */
  try {
    const reviewId = validateObjectId(req.params.id);
    const success = await reviewModel.updateReviewById(reviewId, req.body);

    if (!success) {
      const err = new Error('Review not found');
      err.status = 404;
      throw err;
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a review by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const deleteReview = async (req, res, next) => {
  /* 
    #swagger.tags = ["Reviews"]
    #swagger.summary = "Delete a review by ID"
    #swagger.responses[204] = {
      "description": "Review deleted successfully",
    }
    #swagger.responses[400] = {
      "description": "Invalid ID format"
    }
    #swagger.responses[404] = {
      "description": "Review not found"
    }
    #swagger.responses[500] = {
      "description": "Failed to delete review"
    }
  */
  try {
    const reviewId = validateObjectId(req.params.id);

    const success = await reviewModel.deleteReviewById(reviewId);

    if (!success) {
      const err = new Error('Review not found');
      err.status = 404;
      throw err;
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReview,
  getReviewById,
  getAllReviews,
  updateReview,
  deleteReview,
};
