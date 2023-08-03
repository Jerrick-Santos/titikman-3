require('dotenv').config()
const express = require('express')
const RestoRoutes = require('./routes/resto')
const ReviewRoutes = require('./routes/review')
const ImageRoutes = require('./routes/image')
const MainRoutes = require('./routes/mainRoute')
const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');

//express app
const app = express()

//cookie dependency
app.use(cookieParser());

//import mongoose dependency
const mongoose = require('mongoose')

app.use(cors());
app.use(cookieParser());
//log tracker - middleware
app.use((req, res, next) => {
    console.log(req.path, res.method)
    next()
})

//MULTER MIDDLEWARE
app.post('/images', upload.single('image'), (req, res) => {
    
})

app.get('/getcookie', (req, res) => {
    //show the saved cookies
    console.log(req.cookies)
    res.send(req.cookies);
});


app.use(express.json())

//listen for requests 

//routes
//app.use('/api/home',RestoRoutes)
//app.use('/api/reviews', ReviewRoutes)
// app.use('/images/thumbnail', express.static('images/thumbnail'))
app.use('/images/thumbnail/:imageName', async (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = `${__dirname}/images/thumbnail/${imageName}`;

    res.sendFile(imagePath)
})

app.use('/api', MainRoutes)


//db connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB and listens to PORT', process.env.PORT )
        })
    })
    .catch((err) => {
        console.log(err)
    })




