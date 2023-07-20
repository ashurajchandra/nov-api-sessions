const Post = require("../Model/post");
const _ = require('lodash/core');
const posts = [];

module.exports.createPost = async (req, res) => {
try{
    const { title, description, image } = req.body;
console.log("hello test")
    if(_.isEmpty(title) ){
        return res.status(201).json({
            message: "Title should not be empty",
            data: [],
          });
    }

    const newPost = await Post.create({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    });
    return res.status(201).json({
      message: "Post created successfully",
      data: newPost,
    });
}catch(error){
    return res.status(400).json({
        message:'error ocurred while creating post',
        error:error,
        data:[]
    })
}
};

module.exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({
      message: "Here is your posts from db",
      data: posts,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Some error ocurred while fetching post",
      error:error,
      data: [],
    });
  }
};

module.exports.deletePost = async(req, res) => {
  try {
    //id to find the exact post that needs to be deleted
    //query , params
    const postId = req.params.id;
console.log("postId",postId)
    const deletePost = await Post.findByIdAndDelete(postId)
console.log("deletePost",deletePost)
    return res.status(200).json({
        message:"Post deleted with the particular id",
        id: deletePost._id
    })
    //search inside array to find the post with given id
    // const postIndex = posts.findIndex((post) => post.id == postId);
    // if (postIndex != -1) {
    //   posts.splice(postIndex, 1);
    //   return res.status(200).json({
    //     message: "post with this id is deleted successfuly",
    //     data: postId,
    //   });
    // }

    // if (postIndex == -1) {
    //   return res.status(400).json({
    //     message: "post with that post id do not exist",
    //     data: [],
    //   });
    // }
  } catch (error) {
    return res.status(400).json({
      message: "Some error ocurred while deleting post",
      data: [],
      error:error
    });
  }
};


//update a post of a particular id


module.exports.updatePost = async(req, res)=>{
  try{
    const postId = req.params.id;

    const updatedPost = await Post.findByIdAndUpdate(postId, {$set: req.body})
    console.log("updatedPost",updatedPost)
    return res.status(201).json({
      message:"post updated succesfuly",
      data: updatedPost
    })

  }catch(error){
    return res.status(400).json({
      message: "Some error ocurred while updating post",
      data: [],
      error:error
    });
  }
}
