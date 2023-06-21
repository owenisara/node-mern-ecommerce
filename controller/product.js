const Product = require('../models/Product')


exports.list =async (req,res)=>{
    try{
        const count = parseInt(req.params.count) 
        console.log(count)
        const product = await Product.find().limit(count).populate('category').sort([["createdAt","desc"]]).exec()
        res.send(product)

    }catch(err){
        res.status(500).send('Server Error !!')
    }
}
exports.create =async (req,res)=>{
    try{
       
        const product = await new Product(req.body).save()

        res.send(product)
    }catch(err){
        res.status(500).send('Create Product Fail !!')
    }
}

exports.remove =async (req,res)=>{
    try{
       const deleted = await Product.findOneAndRemove({_id:req.params.id}).exec();
       res.send(deleted)
    }catch(err){
        res.status(500).send('Delete Product Fail !!')
    }
}

exports.read =async (req,res)=>{
    try{
        const id = req.params.id
        const product = await Product.findOne({_id:id}).populate('category').exec()
        res.send(product)

    }catch(err){
        res.status(500).send('Server Error !!')
    }
}

exports.update= async(req,res)=>{
    try{
        const id = req.params.id
        const product = await Product.findByIdAndUpdate({_id:id},req.body,{new:true}).exec()
        res.send(product)
        
    }catch(err){
        res.status(500).send('Updaet Product Error !!')
    }
}

exports.listBy =async (req,res)=>{
    try{
        const{sort,order,limit}= req.body;
        console.log(limit)
        const product = await Product.find()
        .limit(limit).populate('category')
        .sort([[sort,order]]).exec()
        res.send(product)

    }catch(err){
        res.status(500).send('Listby Product Error !!')
    }
}

const handleQuery = async(req,res,query)=>{
    let products = await Product.find({ $text:{ $search:query}})
    .populate('category','_id name');

    res.send(products)
}

const handleCategory = async(req,res,category)=>{
    let products = await Product.find({category})
    .populate('category','_id name');

    res.send(products)
}

exports.searchFilters= async (req,res)=>{
    const {query,category}=req.body
    if(query){
        console.log("query",query)
       await handleQuery(req,res,query)
    }
    //[_id,_id]
    if(category){
        console.log("category",category)
       await handleCategory(req,res,category)
    }
}