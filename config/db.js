const mongoose = require('mongoose')


const connectDB = async() =>{
    try{
    await mongoose.connect(process.env.DATABASE),{
        useNewUrlParser: true,
        useUnifiedTopology: false
    }
    console.log('Connect DB Success')   
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connectDB