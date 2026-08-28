const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique:[true , "username already exists"],
        required:[true , "username is required"]
    },
    email: {
        type:String,
        unique:[true , "Email already exists"],
        required:[true , "Email is required"]
    },
    password: {
        type:String,
        unique:[true , "Password is required"]
    },
    bio:String,
    profileImage: {
        type:String,
        default:""
        //default mai jo bhi image ki url paste kari hoti hai vo profile image hum default mai lagate hai apne account par
    }
})

const userModel = mongoose.model("users" , userSchema)

module.exports = userModel