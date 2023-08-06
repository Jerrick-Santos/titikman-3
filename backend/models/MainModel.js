const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{type: String, required: true}, 
    lastName:{type: String, required: true}, 
    userName: {type: String, required: true}, 
    password: {type: String, required: true},
    bio: String, 
    icon: String,
    userType: {type: Number, required: true}
})

const User = mongoose.model('User', userSchema);



const reviewSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    datePosted:{
        type: Date,
        required: true
    },
    userRating:{
        type: Number,
        // required: true
    },
    revTitle:{
        type: String,
    }, 
    revContent:{
        type: String,
        required: true
    }, 
    isEdited:{
        type: Boolean,
    }, 
    isResponseEdited:{
        type: Boolean,
    }, 
    filename:{
        type: String,
    },
    likes: {
        type: Number, 
        required: true
    },
    dislikes: {
        type: Number, 
        require: true
    },
    hasOwnerResponse: {
        type: Boolean, 
        require: true
    },
    responseDatePosted: {
        type: Date, 
    },
    responseContent: {
        type: String, 
    },
    likedUsers:[String],
    dislikedUsers:[String],
}, {timestamps: true}) 

const Review = mongoose.model('Review', reviewSchema);


const restoSchema = new Schema({
        restoName:{
        type: String, 
        required: true
    }, 
    thumbnail:{
        type: String, 
        required: true
    },
    avgRating:{
        type: Number, 
        required: true
    }, 
    assets:[String],
    description:{
        type: String, 
        required: true
    }, 
    restoUrl:{
        type: String, 
        required: true
    },
    operatingHours:{
        type: String, 
        required: true
    },
    contactNum:{
        type: String, 
        required: true
    }, 
    menuImgs:[String], 
    reviews: {type:[Review.schema]}, //[{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], 
    owner:  { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    keywords: [String]
})

const Resto = mongoose.model('Restaurant', restoSchema);

module.exports = { User, Review, Resto };
