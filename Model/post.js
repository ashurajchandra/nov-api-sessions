
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
    },
    image:{
        type:String,

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Post  = mongoose.model('Post',postSchema )

module.exports = Post;