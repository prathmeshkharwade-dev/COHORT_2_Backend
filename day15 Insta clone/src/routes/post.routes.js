const express = require("express")
const postRouther = express.Router()
const PostController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })


/**
 * POST /api/posts [protected]
 * - req.body = { caption,image-file }
 */
postRouther.post("/",upload.single("image"), PostController.createPostController)


/**
 * GET /api/posts/ [proctected]
 */

postRouther.get("/",PostController.getPostController)

/**
 * GET /api/posts/get-details/ :postid
 * - return an detail about specific post with the id . also check weather the post elong to the user that the request come from 
 */

postRouther.get("/details/:postId", PostController.getPostDetailsController)
 
module.exports = postRouther