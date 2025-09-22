const express =require ('express')
const cors = require('cors')
const connectDB = require('./config/db')
const todoRoutes = require ('./routers/todoRoutes.js')
const dotenv = require('dotenv')
dotenv.config()

connectDB()
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!", error: err.message })
})

app.use("/api/todos" , todoRoutes)

app.listen(port , () =>{
    console.log(`server is running ${port}`)
})