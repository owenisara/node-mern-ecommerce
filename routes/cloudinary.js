const express = require('express')
const router = express.Router()
const {createImage,removeImage} = require('../controller/cloudinary')
const{auth,adminCheck}=require('../middleware/auth')



router.post("/images",auth,createImage)


router.post('/removeimages',auth,removeImage)



module.exports = router