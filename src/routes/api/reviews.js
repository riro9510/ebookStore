const router = require('express').Router();
const reviewController = require('../../controllers/reviewController');
const { validateJoiSchema } = require('../../middleware/validator');
const { reviewSchema } = require('../../schemas/reviewSchema');
const { isAuthenticated } = require('../../middleware/authenticate');

router.post(
  '/',
  isAuthenticated,
  validateJoiSchema(reviewSchema),
  reviewController.createReview
);
router.put('/:id', isAuthenticated,reviewController.updateReview);
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.delete('/:id', isAuthenticated,reviewController.deleteReview);

module.exports = router;
