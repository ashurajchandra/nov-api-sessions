const jwt = require("jsonwebtoken")
require("dotenv")

module.exports.verifyToken = (req, res, next) => {
  try {

    //get the token 
    const token = req.headers.authorization;
    console.log("token",token)
    //verify the token
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY)
    //if token verification is success
    console.log("verifiedToken",verifiedToken)
      next()
  } catch (error) {
    return res.status(401).json({
      message: "Please check your token",
      data: [],
      error: error,
    });
  }
};
