//import mini express
const exp = require("express");
const favouriteApiObj= exp.Router();
//import express-async-handler
const errorHandler = require("express-async-handler");

const validateToken=require("../middlewares/validateToken")
//body parsing
favouriteApiObj.use(exp.json())

//import favouritemodel
const Favourite = require("../models/Favourite");
//import jsonwebtoken
const jwt = require("jsonwebtoken");
//const { errorMonitor}=require("node:events")
favouriteApiObj.get("/getfavourite", errorHandler(async(req,res)=>{
    //finding notes from DB 
    let favouriteArray= await  Favourite.find()
    res.send({message:favouriteArray})
}))

//http://localhost:5000/favourite/createfavourite
favouriteApiObj.post("/createfavourite", errorHandler(async (req, res)=>{
    //finding a note in reminderColl with title and description
let favouritefrmdb = await Favourite.findOne({ $and:[{title:req.body.title}]})
//if note not found in favouriteColl
if(favouritefrmdb == null) {
//create reminderobj for favouritemodel
let favouriteobj = new Favourite({
    title:req.body.title,
    description:req.body.description
})
if (favouriteobj.title==""&& favouriteobj.description==""){
    res.send({message:"Empty notes cannot be added to favourites"})
}
else if(favouriteobj.title == "" || favouriteobj.description ==""){
    res.send({message:"Title or Description is empty"})
}
//saving note in favouriteColl
else { 
    //save
    await favouriteobj.save()
    res.send({message:"added to favourites"})
}
}
//if note already in favouriteColl
else {
    res.send({message:"Already added to favourites"})
 }
}))
//http://localhost:5000/favourite/deletefavourite
favouriteApiObj.delete("/removefavourite/:title",errorHandler(async (req, res)=>{
    let title =req.params.title;
    //deleting note in favouritesColl
    let rem= await Favourite.deleteOne({title:req.params.title})
    res.send({message:"removed from favourites"})
}))

//export reminderApiObj
module.exports=favouriteApiObj;
