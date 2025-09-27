const  express= require('express')
const {signup ,login}= require('../cotrollers/auth.controller.js')
const userRoute = express.Router()


userRoute.post('/signup' , signup)
userRoute.post('/login' , login)

module.exports = userRoute 