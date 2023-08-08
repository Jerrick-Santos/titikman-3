require('dotenv').config()
const express = require('express')
const MainRoutes = require('./routes/mainRoute')
const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const passportLocal = require('passport-local')
const bodyParser = require('body-parser')
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

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(session({
//     secret: "secretcode", 
//     resave: true,
//     saveUninitialized: true
// }))


app.use(cors({
    origin: 'https://titikman-3.vercel.app',
    credentials: true, // Enable sending cookies in cross-origin requests
}));


app.use(express.json())
app.set("trust proxy", 1)


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




