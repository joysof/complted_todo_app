const express =require ('express')
const cors = require('cors')
const connectDB = require('./config/db')
const todoRoutes = require ('./routers/todo.routes.js')
const dotenv = require('dotenv')
const userRoute = require('./routers/user.routes.js')
const authMiddleware = require('./middleware/auth.middleware.js')

dotenv.config()

connectDB()
const app = express()
const port = process.env.PORT || 5000

// middleware 
app.use(cors())
app.use(express.json())
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!", error: err.message })
})
// api end point 

app.use("/api/todos",todoRoutes)
app.use("/api/user" ,userRoute )


app.listen(port , () =>{
    console.log(`server is running ${port}`)
})