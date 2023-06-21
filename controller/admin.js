const Order = require('../models/Order')

exports.changeOrderStatus = async (req,res)=>{
    try{
        const{ orderId,orderstatus} = req.body
        let orderUpdate = await Order.findByIdAndUpdate(
            orderId,
            { orderstatus},
            {new:true}
        )
        res.send(orderUpdate)
    }catch(err){
        res.status(500).send("Update Status Error")
    }
}

exports.getOrderAdmin = async(req,res)=>{
    try{
        // const product = await Product.find().limit(count).populate('category').sort([["createdAt","desc"]]).exec()
        
        let order = await Order.find()
        .populate('products.product')
        .populate('orderdBy',"address email firstname lastname phone ")
        .exec()
      
        res.send(order)
    }catch(err){
        res.status(500).send('getOrder Error')
    }
}