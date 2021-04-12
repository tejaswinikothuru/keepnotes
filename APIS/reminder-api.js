//import mini express
const exp = require("express");
const reminderApiObj = exp.Router();
//import express-async-handler
const errorHandler = require("express-async-handler");
const validateToken=require("../middlewares/validateToken")
//body parsing
reminderApiObj.use(exp.json())
//import favouritemodel
const Reminder = require("../models/reminder");
//import jsonwebtoken
const jwt = require("jsonwebtoken");

reminderApiObj.get("/getreminder",validateToken, errorHandler(async(req,res)=>{
    //finding notes from DB 
    let reminderArray= await  Reminder.find()
    res.send({message:reminderArray})
}))

//http://localhost:5000/reminder/createreminder
reminderApiObj.post("/createreminder",validateToken, errorHandler(async (req, res)=>{
    //finding a note in reminderColl with title and description
let reminderfrmdb = await Reminder.findOne({ $and:[{title:req.body.title}]})
//if note not found in reminderColl
if(reminderfrmdb == null) {
//create reminderobj for remindermodel
let reminderobj = new Reminder({
    title:req.body.title,
    description:req.body.description
})
if (reminderobj.title==""&& reminderobj.description==""){
    res.send({message:"Empty notes cannot be added to reminder"})
}
else if(reminderobj.title == "" || reminderobj.description ==""){
    res.send({message:"Title or Description is empty"})
}
//saving note in reminderColl
else { 
    //save
    await reminderobj.save()
    res.send({message:"added to reminders"})
}
}
//if note already in reminderColl
else {
    res.send({message:"Already added to reminder"})
 }
}))
//http://localhost:5000/reminder/deletereminder
reminderApiObj.delete("/removereminder/:title",validateToken, errorHandler(async (req, res)=>{
    let title =req.params.title;
    console.log("in server", title)
    //deleting note in reminderColl
    let rem= await Reminder.deleteOne({title:req.params.title})
    res.send({message:"removed from reminder"})
}))

//export reminderApiObj
module.exports=reminderApiObj;
