const app = require('./src/App')
require('dotenv').config()



const connectDB = require('./src/config/Database')

connectDB()





app.listen(3000 , () => {
    console.log("Server is running on port 3000")
})