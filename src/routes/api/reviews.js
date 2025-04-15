const router = require('express').Router();
const reviewController = require('../../controllers/reviewController');
const { validateJoiSchema } = require('../../middleware/validator');
const { reviewSchema } = require('../../schemas/reviewSchema');

router.post(
  '/',
  validateJoiSchema(reviewSchema),
  reviewController.createReview
);
router.put('/:id', reviewController.updateReview);
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
