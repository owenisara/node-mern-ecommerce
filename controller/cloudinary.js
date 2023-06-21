const cloudinary = require("cloudinary")

  cloudinary.config({ 
    cloud_name: 'dsxjkljpf', 
    api_key: '159722437521588', 
    api_secret: 'h32ahweVqIUqOiQSUY7U6D_OVAI' 
  });

exports.createImage = async (req,res)=>{
    try{  
         
           const result = await cloudinary.uploader.upload(req.body.image,{
            public_id: Date.now(),
            resource_type: "auto",
           });
           res.send(result);
    }
    catch(err){     
          res.status(500).send('Upload Error!!!');
    }
}

exports.removeImage =async (req,res)=>{
    try{  
   let image_id =  req.body.public_id
   await cloudinary.uploader.destroy(image_id,(result)=>{
    res.send(result)
   })
    }catch(err){  
        res.status(500).send('Remove Error!!!');
    }
}

