const express = require('express')
const router = express.Router()
const{getOrderAdmin,changeOrderStatus } = require('../controller/admin')
const{auth,adminCheck}=require('../middleware/auth')

router.put("/admin/order-status",auth,changeOrderStatus)

router.get("/admin/orders",auth,getOrderAdmin)



module.exports = router