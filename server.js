//import express
const exp=require("express")
const app=exp();
 
//import path module
const path=require("path");
 
//merge server with dist
app.use(exp.static(path.join(__dirname,'dist/keepnotes')))
 
//import dotenv
require("dotenv").config()

//import api objects
const userApiObj=require("./APIS/user-api")
const notesApiObj=require("./APIS/notes-api")
const favouriteApiObj=require("./APIS/favourite-api")
const reminderApiObj=require("./APIS/reminder-api")

//forwarding req obj to API router
app.use("/user",userApiObj);
app.use("/notes",notesApiObj);
app.use("/favourite",favouriteApiObj);
app.use("/reminder",reminderApiObj);
//import mongoose
const mongoose=require("mongoose")
 
//connect to mongoose
mongoose.connect(process.env.DBURL,{useNewUrlParser:true,useUnifiedTopology:true})
 
//default connection object
const db=mongoose.connection
db.on('error',()=>console.log("error in connecting database"))
db.on('open',()=>console.log("connected to database"))
 
//middleware to deal with invalid path
app.use((req,res,next)=>{
    res.send({message:req.url+ " is invalid"})
})
 
//middleware for error handling
app.use((err,req,res,next)=>{
    res.send({message:err.message})
})
 
//assigning port
port=process.env.PORT
app.listen(port,()=>{
    console.log("server started at"+ port)
})