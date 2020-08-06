/*

ALL REVIEW ROUTES
================
/ - all reviews
/:id - a review with a specific id

*/

const express = require('express')
const ReviewController = require('../controllers/review')

const router = express.Router()

router.get('/', ReviewController.reviews_all)

router.get('/:review_id' ,ReviewController.review_by_id)

router.post('/', ReviewController.create_review)

router.delete('/:review_id', ReviewController.delete_review)

router.patch('/:review_id', ReviewController.update_review)

router.use(ReviewController.error_handler)

module.exports = router