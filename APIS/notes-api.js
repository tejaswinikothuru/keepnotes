//import mini express
const exp=require("express");
const notesApiObj=exp.Router();
//import bycryptsjs
const bcrypt=require("bcryptjs");
//import express-async-handler
const errorHandler=require("express-async-handler")
const validateToken=require("../middlewares/validateToken")
//body parsing
notesApiObj.use(exp.json());
//import usermodel
const Notes = require("../models/Notes");
//import jsonwebtoken
const jwt=require("jsonwebtoken")

//http://localhost:5000/notes/getnotes
notesApiObj.get("/getnotes",errorHandler(async (req,res)=>{
        //finding notes with status true
        let notesArray=await Notes.find({$and:[{status:true}, {archive:true}]})
        res.send({message:notesArray})
    }))

//http://localhost:5000/notes/createnotes
notesApiObj.post("/createnotes",errorHandler(async (req,res)=>{
    let titlefrmdb=await Notes.findOne({title:req.body.title})
     if(titlefrmdb==null){
    //create notesobj for notesmodel
    let notesobj =new Notes({
    title:req.body.title,
    description:req.body.description,
    status:true,
    archive:true
    })
    
    if(notesobj.title==" " && notesobj.description==""){
        res.send({message:"Empty notes cannot be saved"})
    }
    else if(notesobj.title=="" || notesobj.description==""){
        res.send({message:"Title or Description is empty"})
    }
    else{
        await notesobj.save()
        res.send({message:"notes created"})
    }
    }
    else{
    res.send({message:"title already exists"})
}
}))
//trash
//http://localhost:5000/notes/deletenote
notesApiObj.post("/deletenote",validateToken, errorHandler(async (req,res)=>{
    let newNotesObj= req.body;
    //updating status to false
    let status= await Notes.findOneAndUpdate({$and: [{title:newNotesObj.title},{description:newNotesObj.description},{archive:true}], "status":true}, {status:false})
    res.send({message:"soft deleted"})
}))
//http://localhost:5000/notes/getdeletednotes
notesApiObj.get("/getdeletednotes",validateToken, errorHandler(async(req, res)=>{
    //finding notes with status false
    let notesArray= await Notes.find({status:false})
    res.send({message:notesArray})
}))
//http://localhost:5000/notes/restorenote
notesApiObj.post("/restorenote",validateToken, errorHandler(async(req, res)=>{
    let newNotesObj= req.body;
    //updating status to true
    let status= await Notes.findOneAndUpdate({$and:[{title:newNotesObj.title},{description:newNotesObj.description},{archive:true}], "status":false}, {status:true})
    res.send({message:"note restored"})
}))

//Archive
//http://localhost:5000/notes/archivenote
notesApiObj.post("/archivenote",validateToken, errorHandler(async(req,res)=>{
    let newNotesObj= req.body;
    //updating status to true
    let status = await Notes.findOneAndUpdate({$and:[{title:newNotesObj.title},{description:newNotesObj.description}, {status:true}], "archive":true}, {archive: false}) 
    res.send({message:"Archived notes"})
}))

//http://localhost:5000/notes/undo
notesApiObj.post("/undo",validateToken, errorHandler(async (req, res)=>{
    let newNotesObj= req.body;
    //updating status to true
    let status =await Notes.findOneAndUpdate({$and: [{title:newNotesObj.title}, {description: newNotesObj.description}, {status:true}], "archive":false}, {archive:true})
    res.send({message :"undo"})
}))
//http://localhost:5000/notes/getarchivednotes
notesApiObj.get("/getarchivednotes", validateToken,  errorHandler(async (req,res)=>{
    //finding notes with status false
    let notesArray = await Notes.find({ archive:false})
    res.send({message:notesArray})
}))
//http:localhost:5000/notes/permanentdelete
notesApiObj.delete("/permanentdelete/:title",validateToken,errorHandler(async(req,res)=>{
    let obj=await Notes.deleteOne({ title:req.params.title})
    res.send({message:"deleted permanently"})
}))
notesApiObj.put("/updatednote",errorHandler(async(req, res)=>{
    console.log("Update Note", req.body)
let success=await Notes.updateOne({title:req.body.title},{
    description: req.body.description
})
res.send({message:"success"})
}))

//export notesApiObj
module.exports = notesApiObj;