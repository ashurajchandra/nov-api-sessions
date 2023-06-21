const express = require("express");

const router = express.Router()
console.log("hello post route")
const postController = require("../Controller/post")
const {verifyToken} = require("../security/tokenVerification")
// router.get()

// router.delete()

// router.put()
console.log("hiiiii rotes")

router.post("/createPost", verifyToken,  postController.createPost)
router.get("/getPost", postController.getPosts )
router.delete("/deletePost/:id", postController.deletePost)

router.put("/updatePost/:id", postController.updatePost)


module.exports = router