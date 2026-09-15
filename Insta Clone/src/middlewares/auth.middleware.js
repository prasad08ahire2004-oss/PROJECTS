const jwt = require('jsonwebtoken')

async function identifyUser(req,res,next) {
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

    req.user = decoded
    next()
}

module.exports = identifyUser