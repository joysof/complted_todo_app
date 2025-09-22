const express =require ('express')
const cors = require('cors')
const connectDB = require('./config/db')
const todoRoutes = require ('./routers/todoRoutes.js')

connectDB()
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/todos" , todoRoutes)

app.listen(5000 , () =>{
    console.log("server is running")
})