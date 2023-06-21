const express = require('express')
const router = express.Router()
const{register,login,currenUser}=require('../controller/auth')
const{auth,adminCheck}=require('../middleware/auth')


//Endpoint http://licalhost:5500/api
//Method post
//Access Public
router.post('/register',register)

//Endpoint http://licalhost:5500/api
//Method post
//Access Public
router.post('/login',login)

//Endpoint http://licalhost:5500/api
//Method post
//Access Private
router.post('/curren-user',auth,currenUser)


//Endpoint http://licalhost:5500/api
//Method post
//Access Private
router.post('/curren-admin',auth,adminCheck,currenUser)








module.exports = router