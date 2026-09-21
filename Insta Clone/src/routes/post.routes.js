const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require('../middlewares/auth.middleware')


//is API mai phale hum token ki help se konse user ne post create karne ki request dali hai vo pata kiya aur post bani
postRouter.post("/" , upload.single('image'), identifyUser, postController.createPostController)


//is API ke andar hum ne jo bhi user ne request dali hai usko token ki help se verify kiya aur us user ki sari posts ko humne database se fetch kiya aur user ko send kiya
postRouter.get("/" , identifyUser, postController.getPostController)


//is API ke andar hum post id ki help se humne database se post ki details ko fetch kiya aur user ko send kiya
postRouter.get("/details/:postId" , identifyUser, postController.getPostDetailsController)

postRouter.post("/like/:postId" , identifyUser, postController.likePostController)



module.exports = postRouter