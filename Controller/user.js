const User = require("../Model/user");
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports.registerUser = async (req, res) => {
  try {
    //create entry using user colection
    //name, email, password, confirmPassword,age,

    const { name, email, password, confirmPassword, age } = req.body;

    const newUser = await User.create({
      name: req.body.name,
      email: email,
      password: password,
    //   confirmPassword: confirmPassword,
      age: age,
    });

    console.log("newUser",newUser)

    return res.status(201).json({
        message: "User registered successfully",
        data: newUser
    })
  } catch (error) {
    //error
      return res.status(400).json({
        message:'Error occurred while registering user',
        data:[],
        error: error
      })
  }
};

module.exports.loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;
     console.log("email", email)
        // find the user using email
        const existingUser = await User.findOne({email:email})
        console.log("existingUser", existingUser)
        if(!existingUser){
          return res.status(404).json({
            message:"User is not registered ",
            data:[]
          })
        }

        if(existingUser.password != req.body.password){
            return res.status(404).json({
                message:"Password is incorrect ",
                data:[]
              })
        }

        const token = jwt.sign({id:existingUser._id, email:existingUser.email}, process.env.JWT_SECRET_KEY)

        return res.status(200).json({
            message:"User login successfully",
            data: token
        })

    }catch(error){
        return res.status(400).json({
            message:'Error while login',
            data:[],
            error:error
        })
    }
};
