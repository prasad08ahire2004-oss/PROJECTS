const express = require('express')
const userController = require('../controllers/user.controller')
const identifyUser = require('../middlewares/auth.middleware')

const userRouter = express.Router()

/*is API se hum koi aur user ko follow kar sakte hai */
userRouter.post("/follow/:username" , identifyUser , userController.followUserController)

/* is API se hum koi following user ko unfollow kar sakte hai */
userRouter.post("/unfollow/:username" , identifyUser , userController.unfollowUserController)

module.exports = userRouter