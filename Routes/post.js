const express = require("express");

const router = express.Router()
console.log("hello post route")
const postController = require("../Controller/post")
const {verifyToken} = require("../security/tokenVerification")
console.log("hiiiii rotes")

router.post("/createPost",verifyToken , postController.createPost)
router.get("/getPost",verifyToken, postController.getPosts )
router.delete("/deletePost/:id",verifyToken, postController.deletePost)

router.put("/updatePost/:id",verifyToken, postController.updatePost)


module.exports = router