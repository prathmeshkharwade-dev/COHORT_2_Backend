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


module.exports = postRouther