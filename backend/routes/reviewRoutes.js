const express = require('express');
const router = express.Router();
const { createReview, getReviewsByTour, getAllReviews, getReviewsByUser, addFeedbackToReview } = require('../controllers/reviewController');

router.post('/', createReview);
router.get('/:tourId', getReviewsByTour); 
router.get("/", getAllReviews);
router.get('/user/:userId', getReviewsByUser);
router.put('/:reviewId/feedback', addFeedbackToReview);

module.exports = router;