const express = require('express')
const router = express.Router()
const {create,list,remove,read,update,listBy,searchFilters} =require('../controller/product') 
const{auth,adminCheck}=require('../middleware/auth')

router.get('/product/:count',list)

router.post('/product',auth,adminCheck,create)

router.delete('/product/:id',auth,adminCheck,remove)

router.get('/editproduct/:id',read)

router.put('/editproduct/:id',auth,adminCheck,update)

router.post('/productby',listBy)

router.post('/search/filters',searchFilters)


module.exports = router