const express = require('express')
const router = express.Router()
const{listUser,
    readUser,
    updateUser,
    removeUser,
    changeStatus,
    changeRole,
    userCart,
    getUserCart,
    saveAddress,
    saveOrder,
    emptyCart,
    getOrder}=require('../controller/users')
const{auth,adminCheck}=require('../middleware/auth')


//Endpoint http://licalhost:5500/api
//Method GET
//Access Private
router.get('/users',auth,adminCheck,listUser)
//Endpoint http://licalhost:5500/api
//Method GET
//Access Private
router.get('/users/:id',readUser)
//Endpoint http://licalhost:5500/api
//Method put
//Access Private
router.put('/users/:id',updateUser)
//Endpoint http://licalhost:5500/api
//Method delete
//Access Private
router.delete('/users/:id',removeUser)

//Endpoint http://licalhost:5500/api
//Method Post
//Access Private
router.post('/change-status',auth,adminCheck,changeStatus)

router.post('/change-role',auth,adminCheck,changeRole)

//Endpoint http://licalhost:5500/api/user/cart
//Method Post
//Access Private
router.post('/user/cart',auth,userCart)

router.delete('/user/cart',auth,emptyCart)

router.get('/user/cart',auth,getUserCart)

router.post('/user/address',auth,saveAddress)

//Order
router.post('/user/order',auth,saveOrder)

router.get('/user/orders',auth,getOrder)




  







module.exports = router