const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports.verifyToken=(req, res, next)=>{
    try{

        //token from header
        const token = req.headers.authorization;
        console.log("token", token)
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY )
console.log("decodedToken",decodedToken)
        //verification successful
        next()
    }catch(error){
      return res.status(401).json({
        message:'Token is not valid',
        data:[],
        error:error
      })
    }
}