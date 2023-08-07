const {Resto, User, Review} = require('../models/MainModel')
const mongoose = require('mongoose')
const { MongoClient, ObjectId } = require('mongodb');
const e = require('express');
const { uploadFile } = require('../s3')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

//COOKIES REQUEST
const getCookies = (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies);
}

//USER REQUESTS

const createUser = async (req, res) => {
    const {firstName, lastName, userName, plainpassword, bio, userType} = req.body

    let icon = "https://titikman.s3.amazonaws.com/user1.png"

    try {

        const password = await bcrypt.hash(plainpassword, 10)
        console.log(password)
        newUser = new User({firstName, lastName, userName, password, bio, icon, userType})
        const savedUser = await newUser.save();

        res.cookie('userType', savedUser.userType, { expires: undefined });
        res.cookie('_id', savedUser._id, { expires: undefined });
        res.cookie('rememberMe', false)

        console.log('New user saved to MongoDB:', savedUser);
        res.status(200).json({newUser})
        

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


const login = async (req, res) => {
    const { userName, password, rememberMe } = req.body;
    
    User.findOne({ userName: userName }).then(async (user) => {
        if (user) {
            const check = await bcrypt.compare(password, user.password)
            console.log(check)
            if (await bcrypt.compare(password, user.password)) {
                let expiryDate;
                if (rememberMe) {
                    expiryDate = new Date(Date.now() + 3 * 7 * 24 * 60 * 60 * 1000);  // 3 weeks expiration
                } else {
                    expiryDate = undefined;  // Expire when the browser is closed
                }

                res.cookie('userType', user.userType, { expires: expiryDate });
                res.cookie('_id', user._id, { expires: expiryDate });
                res.cookie('rememberMe', rememberMe);


                //creare token
                const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
                res.header('auth-token', token).send(token);

                res.json("Success");
            } else {
                res.status(401).json("Password Incorrect");
            }
        } else {
            res.status(401).json("No Record Exists");
        }
    });
};


const getUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No User Found'})
    }

    const user = await User.findById(id)

    if(!user){
        return res.status(404).json({error: 'User Not Found'})
    }

    res.status(200).json(user)
}

const editUser = async (req, res) => {
    const { id } = req.params

    let icon;
    if (req.file) {
        //filename = req.file.filename;
        //upload to S3 server
        try {
            const s3Response = await uploadFile(req.file)
            icon = s3Response.Location
            console.log(s3Response.Location)
        } catch (error) {
            console.error('File not uploaded to S3')
        }
    }
    else{

        const previousImage = await User.findOne(
            { _id: id }
          );
    
          if (!previousImage) {
            console.log('Restaurant or Review not found.');
            return;
          }
    
          icon = previousImage.icon;
          console.log(icon);
 
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No User Found'})
    }

    try {
        const user = await User.findOneAndUpdate({_id: id}, {
            ...req.body,
            "icon": icon
        })

        if(!user){
            return res.status(404).json({error: 'User Not Found'})
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error})
    }

}

//REVIEW REQUESTS


const getReviewsByUser = async (req, res) => {

    const { id } = req.params

    try {

        const restos = await Review.find({user: id})
        .sort({createdAt: -1})
        .populate({
            path: 'restaurant',
            select: 'restoName',
        });

        res.status(200).json(restos)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}


//get a single review
const getReview = async (req, res) => {
    const { id } = req.params

    console.log('hahha')

    try {

        const review = await Review.findById(id)

        res.status(200).json(review)
        
    } catch (error) {
        return res.status(400).json({error: error})
    }

    
}

//create a review

const createReview = async (req, res) => {

    const { restoid, id } = req.params 
    console.log("is it running")
    console.log(restoid)
    console.log(id)
    console.log("is it true")

    let filename;
    if (req.file) {
        //filename = req.file.filename;
        //upload to S3 server
        try {
            const s3Response = await uploadFile(req.file)
            filename = s3Response.Location
            console.log(s3Response.Location)
        } catch (error) {
            console.error('File not uploaded to S3')
        }
    }
    else{
        filename=""
    }


    let { 
            userRating, 
            revContent,
            revTitle
        } = req.body

    //get user id via session - insert code here 
    user = id 
    datePosted = new Date()
    likes = 0
    dislikes = 0 
    hasOwnerResponse = false 

    //add doc to db
    try{

        const resto = await Resto.findById(restoid)

        if (!resto){
            return res.status(404).json({error: 'No Resto Found'})
        }

        const restaurantName = resto.restoName;

        const newReview = new Review({            
            user, 
            datePosted, 
            userRating, 
            restaurant: restoid,
            restaurantName,
            revContent,
            filename,
            likes, 
            dislikes,
            hasOwnerResponse,
            revTitle
        })
        
        newReview.save()

        if (newReview == null){
            return res.status(404).json({error: 'Did not Create Review'})
        }

        resto.reviews.push(newReview)

        resto.save()

        res.status(200).json(resto)
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

const deleteReview = async (req, res) => {
    const { resto, id } = req.params 

    console.log(resto)
    console.log(id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Review Found'})
    }

    if(!mongoose.Types.ObjectId.isValid(resto)){
        return res.status(404).json({error: 'No Resto Found'})
    }


    try {

        //delete from review schema

        const review = await Review.findOneAndDelete({_id: id})

        if(!review){
            return res.status(404).json({error: 'Review Not Found'})
        }

        //delete from resto schema

        const deletedRev = await Resto.updateOne(
            { _id: resto },
            { $pull: { reviews: { _id: id } } }
          );
      
        res.status(200).json({message: "Resto has been deleted"})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}


// update a review

const updateReview = async (req, res) => {
    const { resto, id } = req.params 
    const { userRating, revContent, revTitle, likes, dislikes, hasOwnerResponse, responseContent, likedUsers, dislikedUsers, isEdited, isResponseEdited} = req.body;

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)

    let filename;
    if (req.file) {
        try {
            const s3Response = await uploadFile(req.file)
            filename = s3Response.Location
            console.log(s3Response.Location)
        } catch (error) {
            console.error('File not uploaded to S3')
        }
    }
    else{

        const previousImage = await Resto.findOne(
            { _id: resto },
            { reviews: { $elemMatch: { _id: id } } }
          );
    
          if (!previousImage) {
            console.log('Restaurant or Review not found.');
            return;
          }
    
          filename = previousImage.reviews[0].filename;
          console.log(filename);
 
    }

    console.log(resto)
    console.log(id)
    console.log(filename)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Review Found'})
    }

    if(!mongoose.Types.ObjectId.isValid(resto)){
        return res.status(404).json({error: 'No Resto Found'})
    }


    try {

        //delete from review schema

        const review = await Review.findOneAndUpdate({_id: id}, {
            ...req.body
        })

        if(!review){
            return res.status(404).json({error: 'Review Not Found'})
        }

        //delete from resto schema

        const updatedRev = await Resto.updateOne(
            { _id: resto, 'reviews._id': id },
            {
                $set: {
                  'reviews.$.userRating': userRating,
                  'reviews.$.revContent': revContent,
                  'reviews.$.revTitle': revTitle,
                  'reviews.$.likes': likes,
                  'reviews.$.dislikes': dislikes,
                  'reviews.$.filename': filename,
                  'reviews.$.hasOwnerResponse': hasOwnerResponse,
                  'reviews.$.responseDatePosted': Date.now(),
                  'reviews.$.responseContent': responseContent,
                  'reviews.$.likedUsers': likedUsers,
                  'reviews.$.dislikedUsers': dislikedUsers,
                  'reviews.$.isEdited': isEdited,
                  'reviews.$.isResponseEdited': isResponseEdited

                }
              }
            );
      
        res.status(200).json(updatedRev)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}


//RESTO REQUESTS

//get all restos 
const getRestos = async (req, res) => {

    const cookieOptions = {
        httpOnly: true, // Prevent client-side JavaScript access
        secure: true,   // Only send cookies over HTTPS
        domain: 'https://titikman.vercel.app', // Replace with your actual domain
      };


    if(req.cookies._id && req.cookies.userType){
        if(req.cookies._id == process.env.GUEST_USERID && req.cookies.userType == 1){
            res.cookie('userType', 1, cookieOptions);
            res.cookie('_id', process.env.GUEST_USERID, cookieOptions);
            Cookies.set('userType', 1, cookieOptions);
            Cookies.set('_id', process.env.GUEST_USERID, cookieOptions);
            console.log("Anon User Match")
        }
        else{
            console.log("Diff User")
        }
    }
    else{
        res.cookie('userType', 1);
        res.cookie('_id', process.env.GUEST_USERID);
    }



    try {

        const restos = await Resto.find({}).sort({createdAt: -1})


        res.status(200).json(restos)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const searchResto = async (req, res) => {

    const searchName = req.query.name;
    console.log(searchName)
  try {
    // Perform the search in the 'restoName' field
    const restos = await Resto.find({ restoName: {$regex: searchName, $options : 'i'} });
    
    // Perform search when restoname is not found
    if (restos.length === 0) {
        console.log("resto name not found");
        
        const keywordsRestos = await Resto.find({ keywords: { $regex: searchName, $options: 'i' } });
        res.status(200).json(keywordsRestos);
      } else {
        res.status(200).json(restos);
      }
    
  } catch (error) {
    res.status(500).json({ error: error});
  }

}

//get a single resto 
const getResto = async (req, res) => {
    const { id } = req.params

    const resto = await Resto.findById(id)

    if (!resto){
        return res.status(404).json({error: 'No Resto Found'})
    }

    res.status(200).json(resto)
}


const uploadAssets = async (req, res) => {

}

const uploadMenu = async (req, res) => {
    
}

// create a resto
const createResto = async (req, res) => {
    const {
            restoName, 
            thumbnail,
            avgRating, 
            assets,
            description, 
            restoUrl, 
            operatingHours, 
            contactNum, 
            menuImgs, 
            reviews, 
            userName, 
            password,
            userType
        } = req.body


    //add doc to db
    try{

        const owner = await User.create({userName, password, userType})

        if (owner == null){
            return res.status(404).json({error: 'Did not Create Owner'})
        }


        const resto = await Resto.create({
            restoName, 
            thumbnail,
            avgRating, 
            assets,
            description, 
            restoUrl, 
            operatingHours, 
            contactNum, 
            menuImgs, 
            reviews, 
            owner
        })
        res.status(200).json(resto)
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

const updateResto = async (req,res) => {
    const { id } = req.params
    const { avgRating } = req.body;

    //const resto = await Resto.findById(id)


    try {

        //delete from resto schema

        const resto = await Resto.findOneAndUpdate({_id: id}, {
            ...req.body
        })

        if(!resto){
            return res.status(404).json({error: 'Resto Not Found'})
        }

        //delete from resto schema

        const updatedRes = await Resto.updateOne(
            { _id: id},
            {
                $set: {
                  'resto.$.avgRating': avgRating
                }
              }
            );
      
        res.status(200).json(updatedRes)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }    
}

//IMAGE REQUESTS


const getThumbnail = async (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = `${__dirname}/images/thumbnail/${imageName}`;

    res.sendFile(imagePath)
}

module.exports = {
    getRestos,
    searchResto,
    uploadMenu,
    uploadAssets,
    getResto,
    createResto,
    getThumbnail,
    getReview,
    getReviewsByUser,
    createReview,
    deleteReview,
    updateReview,
    //newly added
    updateResto,
    createUser,
    getUser,
    editUser,
    login,
    getCookies
}