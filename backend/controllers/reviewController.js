const { default: mongoose } = require('mongoose')
const Review = require('../models/ReviewModel')
const mongoos = require('mongoose')

//get all reviews 
const getReviews = async (req, res) => {
    const reviews = await Review.find({}).sort({createdAt: -1})
    res.status(200).json(reviews)
}


//get a single review
const getReview = async (req, res) => {
    const { id } = req.params 

    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Revies Found'})
    }

    const review = await Review.findById(id)

    if(!review){
        return res.status(404).json({error: 'Review Not Found'})
    }

    res.status(200).json(review)
}

const createReview = async (req, res) => {
    const {username, 
            userRating, 
            datePosted, 
            revContent, 
            reviewImg, 
            likes, 
            dislikes} = req.body

    //add doc to db
    try{
        const review = await Review.create({
            username, 
            datePosted, 
            userRating, 
            revContent,
            reviewImg, 
            likes, 
            dislikes
        })
        res.status(200).json(review)
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

// delete a review
const deleteReview = async (req, res) => {
    const { id } = req.params 


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Revies Found'})
    }

    const review = await Review.findOneAndDelete({_id: id})

    if(!review){
        return res.status(404).json({error: 'Review Not Found'})
    }

    res.status(200).json(review)

}


// update a review

const updateReview = async (req, res) => {
    const { id } = req.params 


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Reviews Found'})
    }

    const review = await Review.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!review){
        return res.status(404).json({error: 'Review Not Found'})
    }

    res.status(200).json(review)

}

module.exports = { 
    getReviews,
    getReview,
    createReview,
    deleteReview,
    updateReview
}