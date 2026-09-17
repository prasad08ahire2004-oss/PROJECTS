const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')

async function followUserController(req , res){

    /*identify middleware se kon sa user follow kar raha hai vo is line par pata chal jata hai */
    const followerUsername = req.user.username

    /*konse user ko follow karna hai uska username API ke :username parameter se yaha pata chal jata hai */
    const followeeUsername = req.params.username

    if(followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExists) {
        return res.status(404).json({
            message: `User ${followeeUsername} does not exist`
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        following: followeeUsername
    })

    if(isAlreadyFollowing) {
        return res.status(400).json({
            message: `You are already following ${followeeUsername}`
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        following: followeeUsername
    })

    res.status(200).json({
        message: `User ${followerUsername} is now following ${followeeUsername}`,
        follow: followRecord
    })
    
}

async function unfollowUserController(req , res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        following: followeeUsername
    })

    if(!isUserFollowing) {
        return res.status(400).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `User ${followerUsername} has unfollowed ${followeeUsername}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController
}