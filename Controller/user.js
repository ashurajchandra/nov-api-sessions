const User = require("../Model/user");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const _ = require('lodash/core');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res) => {
  try {
    //create entry using user colection
    //name, email, password, confirmPassword,age,

    const { name, email, password, confirmPassword, age } = req.body;

  const error = validationResult(req);

  if(!error.isEmpty()){
      return res.status(400).json({error: error.array() })
  }

    // if(_.isEmpty(name) ||_.isEmpty(email) || _.isEmpty(password)  ){
    //   return res.status(400).json({
    //     message:" Please check...required field is missing",
    //     data:[],
    //   })
    // }
  

    const salt  = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password,salt )
console.log("hashedPassword",hashedPassword)
    const newUser = await User.create({
      name: req.body.name,
      email: email,
      password: hashedPassword,
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
    console.log("error",error)
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
     const verifyPassword = await bcrypt.compare(req.body.password,existingUser.password)
     console.log("verifyPassword",verifyPassword)
        if(!verifyPassword){  //false
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
