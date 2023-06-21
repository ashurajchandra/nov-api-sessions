const mongoose = require("mongoose");
require('dotenv').config()



mongoose.connect(process.env.MONGO_URL)
.then((response)=>console.log("database connected"))
.catch((error)=>{console.log("error in connecting to db", error)})