const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower: {
        type:String,
    },
    following: {
        type:String,
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
})

/* Creating a unique index on the combination of follower and following fields to ensure that a user cannot follow the same user multiple times. */
followSchema.index({ follower: 1, following: 1 }, { unique: true })

const followModel = mongoose.model("follows" , followSchema)

module.exports = followModel