const express = require("express")
const router = express.Router();
const User = require("../model/user")
const checkAuth = require("../middleware/checkAuth");
const config = require('../config.json')
const jwt = require('jsonwebtoken')

router.post('/register',async (req,res)=>{
    const {fullName,email,password} = req.body;
    if(!fullName){
        return res.status(400).json({err:true,message:"Name is required ."})
    }
    if(!email){
        return res.status(400).json({err:true,message:"Email is required ."})
    }
    if(!password){
        return res.status(400).json({err:true,message:"Password is required ."})
    }

    const isUser = await User.findOne({email})
    if(isUser){
        return res.status(400).json({err:true,message:"Email already in use ."})
    }

    const user = await User.create({
        fullName,
        email,
        password
    })
    const token = jwt.sign({ id: user._id },config.privateKey, { expiresIn: '1d' });
    return res.status(200).json({err:false,token,message:"User created ."})

})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    console.log(email , password)
    if(!email){
        return res.status(400).json({err:true,message:"Email is required ."})
    }
    if(!password){
        return res.status(400).json({err:true,message:"Password is required ."})
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({err:true,message:"User not found ."})
    }
    if(user.password != password){
        return res.status(400).json({err:true,message:"Incorrect Password ."})
    }

    const token = jwt.sign({ id: user._id },config.privateKey, { expiresIn: '1d' });
    return res.status(200).json({err:false,token,message:"User Logged in."})

})

router.get("/getUser",checkAuth,async(req,res)=>{
    const userId = req.userId;
    const user = await User.findById(userId.id)
    if(!user){
        return res.status(403).json({err:true,message:"Unauthorized."})
    }
    return res.status(200).json({err:false,message:"User Details fetched .",user})

})


module.exports = router