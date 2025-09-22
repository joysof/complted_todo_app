const mongoose = require('mongoose')



const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb://localhost:27017')
        console.log('mongoDB connected')
    } catch (error) {
        console.log("mongoDB connected faild")
        process.exit(1)
        
    }
}
module.exports = connectDB