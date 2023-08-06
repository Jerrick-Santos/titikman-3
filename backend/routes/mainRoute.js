const express = require('express')
const {    getRestos,
    getResto,
    createResto,
    searchResto,
    getThumbnail,
    getReviewsByUser,
    getReview,
    createReview,
    deleteReview,
    updateReview,
    createUser,
    getUser,
    editUser,
    login,
    getCookies} = require('../controllers/mainController')

const router = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//COOKIES

router.get('/cookies', getCookies)

// USERS

router.get('/profile/:id', getUser) //OK

router.patch('/profile/:id', upload.single('image'), editUser) //OK

router.post('/signup', createUser) //OK

router.post('/login', login)


// REVIEWS

router.get('/reviewsbyuser/:id', getReviewsByUser)

router.get('/review/:id', getReview) 

router.post('/reviewnew/:restoid/:id', upload.single('image'), createReview) //OK -> resto id
 
router.delete('/review/:resto/:id', deleteReview) //OK -> restoid/reviewid

router.patch('/review/:resto/:id', upload.single('image'), updateReview) //OK -> restoid/reviewid

// RESTO

router.get('/restos', getRestos) //OK

router.get('/resto/search', searchResto)

router.get('/resto/:id', getResto) //OK

router.post('/restonew', createResto) //OK

//COOKIES 

router.get('/userid',)


// TEST ROUTES 



module.exports = router