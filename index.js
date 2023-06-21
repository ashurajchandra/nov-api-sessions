const express = require('express');
const db = require('./utils/dbConfig')

const app = express()
const PORT = 8000;

const authRoute = require('./Routes/user')
const postRoute = require("./Routes/post")
// const router = app.router

//localhost::/8000/

app.use(express.urlencoded())
app.use(express.json())
app.use("/post", postRoute)
app.use("/user",authRoute)
const userInfo = {
    name:'Ashutosh',
    place:"bihar",
    company: "slate.ai"
}
// (route, callback)
app.get("/get-data", (req, res)=>{
    console.log("inside get data")
    return res.status(200).json({
        message:"data found succesfuly",
        data: userInfo
    })
})

app.get("/",(req,res)=>{
    return res.status(200).json({
       message:"welocme to homepage"
    })
})
app.get("/hello",(req,res)=>{
    console.log("inside hello route")
    return res.send("hello world")
})


app.listen(PORT, ()=>{console.log(`app is up and running on port:${PORT} `)})
