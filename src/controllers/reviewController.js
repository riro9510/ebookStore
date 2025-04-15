const reviewModel = require('../models/reviewsModel');
const { reviewSchema } = require('../schemas/reviewSchema');
const { ObjectId } = require('mongodb');
const { validateObjectId } = require('../utilities/index');

/**
 * Create a new review
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const createReview = async (req, res) => {
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
      "schema": { "message": "Review created successfully", "id": "ObjectId" }
    }
    #swagger.responses[400] = {
      "description": "Validation error"
    }
    #swagger.responses[500] = {
      "description": "Failed to create review"
    }
  */
  try {
    const { error, value } = reviewSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const insertedId = await reviewModel.createReview(value);
    res
      .status(201)
      .json({ message: 'Review created successfully', id: insertedId });
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
const updateReview = async (req, res) => {
  /* 
    #swagger.tags = ["Reviews"]
    #swagger.summary = "Update a review by ID"
    #swagger.parameters['body'] = {
      "in": "body",
      "required": true,
      "schema": { "$ref": "#/definitions/Review" }
    }
    #swagger.responses[200] = {
      "description": "Review updated successfully",
      "schema": { "message": "Review updated successfully" }
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
  /* 
    #swagger.tags = ["Reviews"]
    #swagger.summary = "Delete a review by ID"
    #swagger.responses[200] = {
      "description": "Review deleted successfully",
      "schema": { "message": "Review deleted successfully" }
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
