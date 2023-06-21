const bcrypt = require('bcryptjs')
const User = require('../models/User') 
const jwt = require('jsonwebtoken');
exports.register = async(req,res)=>{
try{
    //Check user
    const {firstname,lastname,password,email,phone} =req.body
    var user = await User.findOne({email});
    if(user){
        return res.status(400).send("User Already exists");
    }
    const salt = await bcrypt.genSalt(10);
    user = new User({
         email,
         password,
         firstname,
         lastname ,
         phone
    });
     //Encrypt
     user.password = await bcrypt.hash(password,salt)
    await user.save()
   res.send("Register Success")
    
}catch(err){
    console.log(err)
    res.status(500).send("Server Error")
}} 

exports.login = async(req,res)=>{
    try{
        const{email,password} = req.body
        let user = await User.findOneAndUpdate({email},{new:true})
        //console.log(user)
        if(user && user.enabled){
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(400).send('password Invalid')
            }
            //payload
            const payload = {
                email:{
                    email:user.email,
                    role: user.role
                }
            }
            //Generate Token
            jwt.sign(payload,
                'jwtSecret',
                {expiresIn:10800},
                (err,token)=>{
                if(err)throw err;
                
                res.json({token,payload})
            })

        } else{
            res.status(500).send("User Notfound")
        }
        
        
    }catch(err){
    console.log(err)
    res.status(500).send("Server Error")
    }} 

exports.currenUser = async(req,res)=>{
try{
     console.log(req.user)
const user = await User.findOne({email:req.user.email}).select('-password').exec()
res.send(user)

}catch(err){
    console.log(err)
        res.status(500).send("Server Error")
}
}




