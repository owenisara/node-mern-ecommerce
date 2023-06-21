const bcrypt = require('bcryptjs')
//model
const User = require('../models/User') 
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Order = require('../models/Order')
const jwt = require('jsonwebtoken');

exports.listUser = async(req,res)=>{
try{
    const user = await User.find({}).select('-password ').exec();
    res.send(user)
}
catch (err){
    console.log(err)
    res.status(500).send("Server Error")}
};

exports.readUser = async(req,res)=>{

    try{
        const id = req.params.id
        const user = await User.findOne({_id:id}).select('-password ')
        res.send(user)
    
    
    }
    catch (err){
        console.log(err)
        res.status(500).send("Server Error")}
};

exports.updateUser = async(req,res)=>{
    try{
        
    let  { id, password} = req.body.values

        const salt = await bcrypt.genSalt(10);

      var  endpassword = await bcrypt.hash(password,salt)
      const user = await User.findOneAndUpdate({_id:id},{password:endpassword}).exec()
      console.log(endpassword)
        res.send('Hello Update User')
    }
    catch (err){
        console.log(err)
        res.status(500).send("Server Error")}
};

exports.removeUser = async(req,res)=>{
    try{
        const id = req.params.id
        const user = await User.findOneAndDelete({_id:id}).exec()
        res.send(user)
    }
    catch (err){
        console.log(err)
        res.status(500).send("Server Error")}
};

exports.changeStatus= async(req,res)=>{
    
    try{
       const change = req.body.enabled
       const id = req.body.id
       console.log(change)
        const user = await User.findOneAndUpdate({_id:id},{enabled:change}).exec()
        res.send(user)
    }
    catch (err){
        console.log(err)
        res.status(500).send("Server Error")}
};

exports.changeRole= async(req,res)=>{
    
    try{
       const change = req.body.role
       const id = req.body.id
       console.log(change)
        const user = await User.findOneAndUpdate({_id:id},{role:change}).exec()
        res.send(user)
    }
    catch (err){
        console.log(err)
        res.status(500).send("Server Error")}
};

exports.userCart= async(req,res)=>{
try{
    console.log(req.body ) 
    const {cart} = req.body
    // Check User
    //req.user มาจาก middle wear
    let user = await User.findOne({email:req.user.email}).exec()
  // สร้าง Arryr []
    let products =[]

    let cartOld = await Cart.findOne({orderdBy:user._id}).exec()
    if(cartOld){
        console.log('remove CartOld')
        cartOld.remove()
    }

    for(let i = 0 ; i < cart.length; i++){
        let object = {}

        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.price = cart[i].price;

        products.push(object)
    }
    // หาผลรวมของตะกล้า
    let  cartTotal = 0
    for(let i = 0; i < products.length;i++){
        cartTotal=cartTotal+products[i].price * products[i].count
    }

    let newCart = await new Cart({
        products,cartTotal,orderdBy:user._id
    }).save();
    
    console.log(newCart)
    res.send('User Cart Ok')
}catch(err){
    console.log(err)
    res.status(500).send('userCart Server Error')
}
}

exports.getUserCart = async(req,res)=>{
    try{
        const user = await User.findOne({email:req.user.email}).exec()

        let cart = await Cart.findOne({orderdBy:user._id})
        .populate('products.product',"_id title price")
        .exec()

        const{products,cartTotal} = cart
        res.json({products,cartTotal})
    }catch(err){
        res.status(500).send('getUserCart Error')
    }
}

exports.saveAddress = async(req,res)=>{
    try{
   const user = await User.findOneAndUpdate({email:req.user.email},{address:req.body.address}).exec()
       res.json({ok:true})
    }catch(err){
        res.status(500).send('Save Address Error')
    }
}

exports.saveOrder = async(req,res)=>{

    try{
        console.log(req.body)
    const user = await User.findOne({email:req.user.email}).exec()
  

    let userCart = await Cart.findOne({orderdBy:user._id}).exec()

    let order = await new Order({
        products:userCart.products,
        orderdBy:user._id,
        cartTotal: userCart.cartTotal,
        images:req.body.images
    }).save()

    // + - product
    let bulkOption = userCart.products.map((item)=>{
        return {
            updateOne:{
                filter:{_id:item.product._id},
                update:{$inc:{quantity : -item.count,sold:+item.count}}
            }
        }
    })

    let updated = await Product.bulkWrite(bulkOption,{})
    res.send(updated);

    }catch(err){
        res.status(500).send('Save Order Error')
    }
}

exports.getOrder = async(req,res)=>{
    try{
        const user = await User.findOne({email:req.user.email}).exec()

        let order = await Order.find({orderdBy:user._id})
        .populate('products.product')
        .exec()

        res.json(order)
    }catch(err){
        res.status(500).send('getOrder Error')
    }
}


exports.emptyCart = async(req,res)=>{
    try{
        const user = await User.findOne({email:req.user.email}).exec()

        const empty = await Cart.findOneAndRemove({orderdBy:user._id})
        .exec()

        res.send(empty)
      
    }catch(err){
        res.status(500).send('Remove Cart Error')
    }
}