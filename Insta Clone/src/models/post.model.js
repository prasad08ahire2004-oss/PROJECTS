const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption: {
        type:String,
        degault: ""
    },
    imgUrl: {
        type:String,
        required:[true , "image Url is required for creating the post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true , "user id is required for creating an object"]
    }
})