// const mongoose = require('mongoose')

// const Schema = mongoose.Schema

// const reviewSchema = new Schema({
//     username:{
//         type: String,
//         required: true
//     }, 
//     userProfilePic:{
//         type: Buffer,
//         required: true
//     }, 
//     datePosted:{
//         type: Date,
//         required: true
//     },
//     userRating:{
//         type: Number,
//         required: true
//     },
//     revContent:{
//         type: String,
//         required: true
//     }, 
//     reviewImg:{
//         type: Buffer,
//         required: false
//     },
//     likes: {
//         type: Number, 
//         required: true
//     },
//     dislikes: {
//         type: Number, 
//         require: true
//     },
//     hasOwnerResponse: {
//         type: Boolean, 
//         require: true
//     },
//     responseDatePosted: {
//         type: Number, 
//         require: false
//     },
//     responseContent: {
//         type: String, 
//         require: false
//     }
// }, {timestamps: true}) 

// module.exports = mongoose.model('Review', reviewSchema)