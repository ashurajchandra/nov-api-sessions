const express = require("express");

const router = express.Router()

const {registerUser, loginUser}= require("../Controller/user")


router.post("/registerUser", registerUser)
router.post("/login", loginUser)



module.exports = router