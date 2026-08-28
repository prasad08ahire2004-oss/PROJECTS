const mongoose = require('mongoose')
const dns = require('dns')

dns.setServers(["1.1.1.1" , "8.8.8.8"])

function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then( () => {
        console.log("connected to database")
    })
}

module.exports = connectDB