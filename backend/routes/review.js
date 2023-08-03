const express = require('express')

const {     getReview,
            getReviews,
            createReview,
            deleteReview, 
            updateReview} = require('../controllers/reviewController')

const router = express.Router()


//Get all reviews 
router.get('/', getReviews)

//Get a single Restaurant
router.get('/:id', getReview)

//Post a review 
router.post('/', createReview)

//Delete a review 
router.delete('/:id', deleteReview)

//UPDATE a review 
router.patch('/:id', updateReview)

module.exports = router