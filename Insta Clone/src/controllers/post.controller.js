const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const { Folders } = require('@imagekit/nodejs/resources/index.js')
const jwt = require('jsonwebtoken')

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res) {
    console.log(req.body, req.file)

    // yaha hum ye pata karenge ki konsa user post kar raha hai, to hum token ko verify karenge aur user ka id nikalenge

    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({
            message:"token not provided unauthorized access"
        })
    }

    let decoded = null

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message:"invalid token unauthorized access"
        })
    }

    console.log(decoded)

    const file = await imageKit.files.upload({
        file: await toFile(req.file.buffer, req.file.originalname),
        fileName: "Test",
        folder: "/insta-clone"
        // jitni bhi images imagekit par dalenge vo sari is folder par store honge jo imagekit ke website par present hoga inside [media library] section
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
}

async function getPostController(req,res) {
    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({
            message:"token not provided unauthorized access"
        })
    }

    let decodec = null

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message:"invalid token unauthorized access"
        })
    }

    //yaha hum vo sare post ko return karwa rahe hai jo post is user ne create ki hai jise hum ne decode karwaya hai

    const userId = decoded.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message:"posts fetched successfully",
        posts
    })
}

async function getPostDetailsController(req,res) {

    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({
            message:"token not provided unauthorized access"
        })
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message:"invalid token unauthorized access"
        })
    }

    const userId = decoded.id

    const postId = req.params.postId

    const post = await postModel.findOne({
        _id: postId,
        user: userId
    })

    if(!post) {
        return res.status(404).json({
            message:"post not found"
        })
    }

    res.status(200).json({
        message:"post details fetched successfully",
        post
    })

    const isValidUser = post.user.toString() === userId

    if(!isValidUser) {
        return res.status(403).json({
            message:"you are not authorized to view this post"
        })
    }

    return res.status(200).json({
        message:"post details fetched successfully",
        post
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}