const express = require('express')
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()
const crypto = require("crypto")


/**
 * /api/auth/register
 */
authRouter.post("/register", async (req, res) => {
    const{email, name, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(409).json({
            messege:"User already exists with this email address"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

   const user = await userModel.create({
        email, password: hash, name
    })

    const token = jwt.sign(
        {
         id: user._id,
         email: user.email
        },
        process.env.JWT_SECRET
    )
   
    res.cookie("jwt+token",token)

    res.status(201).json({
        message:"user registered",
        user,
        token
    })
})


/**
 *  POST /api/auth/login
 */

/**
 * Controller   is function ko bol sakte  hai
 */
authRouter.post("/login", async (req, res) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if(!user){
        return res.status(404).json({
            message: "usear not found with this email address"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if (!isPasswordMatched){
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(200).json({
        message:"user logged in",
        user,
    })

 })

module.exports = authRouter

