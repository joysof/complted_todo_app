const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) =>{
    const token = req.headers['authorization']?.split(' ')[1]
    if(!token){
        return res.json({message : "token not valid login agin"})
    }
    try {

        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.userId=decoded.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success : false , message : error.message})
    }
}

module.exports = authMiddleware