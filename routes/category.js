const express = require('express')
const router = express.Router()
const {create,list,read,update,remove} =require('../controller/category') 
const{auth,adminCheck}=require('../middleware/auth')

router.get('/category',list)

router.post('/category',auth,adminCheck,create)

router.get('/category/:id',auth,adminCheck,read)

router.put('/category/:id',auth,adminCheck,update)

router.delete('/category/:id',auth,adminCheck,remove)


module.exports = router