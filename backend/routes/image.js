const express = require('express')
const {getThumbnail} = require('../controllers/imageController')
    
const router = express.Router()

router.get('/:imageName', getThumbnail)

module.exports = router