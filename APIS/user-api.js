//import mini express
const exp=require("express");
const userApiObj=exp.Router();

//import express-async-handler
const errorHandler=require("express-async-handler");

//import bycryptsjs
const bcrypt=require("bcryptjs");

//body parsing
userApiObj.use(exp.json())

//import usermodel
const User = require("../models/User");

//import jsonwebtoken
const jwt=require("jsonwebtoken")

//http://localhost:5000/user/getusers
userApiObj.get("/getusers",errorHandler(async(req,res)=>{ 
    let userArray=await User.find()
    res.send({message:userArray})
}))

//http://localhost:5000/user/createuser
userApiObj.post("/createuser",errorHandler(async(req,res)=>{

    // hashing password
    let hashedpw=await bcrypt.hash(req.body.password,7)
     //searching user in usersColl
    let userfrmdb=await User.findOne({email:req.body.email})
 
    if(userfrmdb==null){
       //create userobj for usermodel
       let userobj=new User({
         firstName:req.body.firstName,
         lastName:req.body.lastName,
         gender:req.body.gender,
         dateOfBirth:req.body.dateOfBirth,
         email:req.body.email,
         password:hashedpw
     })
 
     //save
     await userobj.save()
     res.send({message:"usercreated"})
    }
    //if user already exists
    else{
        res.send({message:"user exists"})
    }
     
 }))

 //login
//http://localhost:5000/user/login
userApiObj.post("/login",errorHandler(async(req,res)=>{
    let usercredobj=req.body;
    //searching useremail in usersColl
    let userfromdb=await User.findOne({email:req.body.email})
    //if useremail is not found
    if(userfromdb==null){
        res.send({message:"invalid email address"})
    }
    //if useremail is found
    else{
        //check password
       let comparision=await bcrypt.compare(usercredobj.password,userfromdb.password)
       //if passwords not matched
       if(comparision==false){
           res.send({message:"invalid password"})
       }
       else{
           //if passwords are matched
           //create a json token and sign it
            let signedtoken=await jwt.sign({firstName:userfromdb.firstName,email:userfromdb.email},process.env.SECRET,{expiresIn:10000})
        
            //send signedtoken to client
                 res.send({message:"login success",token:signedtoken,firstName:userfromdb.firstName,email:userfromdb.email})
       }

    }
}))


//export userApiObj
module.exports=userApiObj;