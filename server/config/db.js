const mongoose = require('mongoose')



const connectDB = async () =>{
    console.log(process.env.MONGODB_URI)

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        
        console.log('mongoDB connected')
    } catch (error) {
        console.log("mongoDB connected faild")

        process.exit(1)
        
    }
}
module.exports = connectDB