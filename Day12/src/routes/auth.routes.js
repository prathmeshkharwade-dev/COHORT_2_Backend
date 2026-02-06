const express = require('express')
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()


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

   const user = await userModel.create({
        email, password, name
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



module.exports = authRouter

