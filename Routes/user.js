const express = require("express");
const {query, body ,matchedData} = require("express-validator");

const router = express.Router();

const { registerUser, loginUser } = require("../Controller/user");

router.post(
  "/registerUser",
  body('name').notEmpty().withMessage("Please enter valid name"),
  body("email").notEmpty().isEmail().withMessage("Please enter proper email"),
  body("password")
    .notEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 8 })
    .withMessage("Please enter a password of upto 8 character long")
    .not()
    .isIn(["12345678", "password"])
    .withMessage("Please provide some strong password"),
    body('confirmPassword').custom((value, {req})=>{
        if(value != req.body.password){
            //12345678 == 123445679
            throw new Error('Password and confirm password does not matches')
        }else{
            return true
        }
    })
//   async (req, res, next)=>{
//     const {password} = matchedData(req)
//     if(password){
//         await body('confirmPassword').equals(password).withMessage('Password does not matches with confirm password').run(req)
//     }
//   }
  ,
  registerUser
);
router.post("/login", loginUser);

module.exports = router;
