const express = require('express')
const UserRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

const {UserModel} = require("../models/User.model")


// Sign Up Here

UserRouter.post('/signup',async(req,res)=>{
    const {email,password,name,age} = req.body
    const userPresent = await UserModel.findOne({email})
    if(userPresent){
        res.status(201).send({"msg":"User is already Exist"})
    }
    try{
        bcrypt.hash(password,4,async function(err,hash){
            const user = new UserModel({email,password:hash,name,age})
            await user.save()
            res.status(200).send({"msg":"Signup Successfull"})
        })
    }
    catch(err){
        console.log(err)
        res.status(400).send({"err":"Something went wrong"})
    }
})


// Login method here


UserRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await UserModel.find({email})
        if(user.length>0){
            const hashed_password = user[0].password
            bcrypt.compare(password,hashed_password, function(err,result){
                if(result){
                    const token = jwt.sign({"userID":user[0]._id},'ravi')
                    res.status(200).send({"msg":"Login Success","token":token})
                }else{
                    res.status(400).send({"err":"Something went wrong"})
                }
            })
        }else{
            res.status(200).send({"err":"Login Failed"})
        }

    }
    catch(err){
        console.log(err)
        res.status(400).send({"err":"Something went wrong"})
    }
    
})

module.exports={
    UserRouter
}