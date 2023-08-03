const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/thumbnail')
    }, 
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname + path.extname(file.originalname))
    }

})

const upload = multer({storage: storage})

module.exports = upload