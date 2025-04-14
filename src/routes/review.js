const router = require('express').Router();
const reviewController = require('../controllers/reviewController');
const { isAuthenticated } = require('../middleware/authenticate');
const { validateJoiSchema } = require('../middleware/validator');
const {reviewSchema} = require('../schemas/reviewSchema');

router.post(
  '/',
  isAuthenticated,
  validateJoiSchema(reviewSchema),
  reviewController.createReview
);
router.put('/:id', isAuthenticated, reviewController.updateReview);
router.get('/',isAuthenticated,reviewController.getAllReviews);
router.get('/:id', isAuthenticated, reviewController.getReviewById);
router.delete('/:id', isAuthenticated, reviewController.deleteReview);

module.exports = router;
