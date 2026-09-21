const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "Post ID is required for liking a post"]
    },
    user: {
        type: String,
        required: [true, "Username is required for liking a post"]
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
})

/* Creating a unique index on the combination of post and user fields to ensure that a user cannot like the same post multiple times. */
likeSchema.index({ post: 1, user: 1 }, { unique: true })

const likeModel = mongoose.model("likes", likeSchema)

module.exports = likeModel