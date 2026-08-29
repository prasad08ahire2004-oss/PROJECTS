const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')



async function registerController(req , res) {
    const {email,username,password,bio,profileImage} = req.body

    /*
    AB YAHA PROBLEM YE HAI KI HUM DATABASE KO DO BAR CALL KARENGE EK BAR EMAIL KE LIYE AUR EK BAR USERNAME KE LIYE

        const isUserExistByEmail = await userModel.findOne({email})
        if(isUserExistByEmail)
        {
            return res.status(409).json({
                message:"user alreadt exists with this email"
            })
        }

        const isUserExistByUsername = await userModel.findOne({username})
        if(isUserExistByUsername)
        {
            return res.status(409).json({
                message:"user name already exists"
            })
        }

    */

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExist)
    {
        return res.status(409).json({
            message:"user already exist" + (isUserAlreadyExist.email === email ? "Email already exist":"Username already exist")
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash
    })


        /*
            Ab is token ke andar vo data rehta hai jo follwing do conditions fulfil kar de.
            1. Data user ka hona chaiye
            2. Data unique hona chaiye
        */
    const token = jwt.sign({
        id: user._id   
    }, process.env.JWT_SECRET, {expiresIn: "1d"})

    res.cookie("token" , token)


    //never send password in response...
    res.status(201).json({
        message:"user registered succesfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function loginController(req,res) {
    const {username,password,email} = req.body

    const user = await userModel.findOne({
        $or: [
            {username:username},
            {email:email}
        ]
    })

    if(!user)
    {
        return res.status(404).json({
            message:"user not found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const isPasswordValid = hash === user.password

    if(!isPasswordValid)
    {
        return res.status(401).json({
            message:"password invalid"
        })
    }

    const token = jwt.sign({
        id:user._id
    }, process.env.JWT_SECRET , {expiresIn: "1d"})

    res.cookie("token" , token)

    res.status(200).json({
        message:"user loggedIn succesfully",
        user: {
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}


module.exports = {
    registerController,
    loginController
}