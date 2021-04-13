//import mini express
const exp = require("express");
const reminderApiObj = exp.Router();

//import express-async-handler
const errorHandler = require("express-async-handler");

//import token
const validateToken=require("../middlewares/verifyToken")

//body parsing
reminderApiObj.use(exp.json())

//import favouritemodel
const Reminder = require("../models/Reminder");

//http://localhost:5000/reminder/getreminders
reminderApiObj.get("/getreminders/:email",validateToken, errorHandler(async (req, res) => {
    //finding notes from DB 
    let reminderArray = await Reminder.find({email:req.params.email})
    res.send({ message: reminderArray })
}))

//http://localhost:5000/reminder/createreminder
reminderApiObj.post("/createreminder",validateToken, errorHandler(async (req, res) => {
    //finding a note in favourtesColl with title and description
    let reminderfrmdb = await Reminder.findOne({$and:[{email:req.body.email},{title: req.body.title}]})
    //if note not found in favouritesColl
    if (reminderfrmdb == null) {
        //create favouriteobj for favouritemodel
        let reminderobj = new Reminder({
            email:req.body.email,
            title: req.body.title,
            description: req.body.description,
            checkList:req.body.checkList

        })

        if (reminderobj.title == "") {
            res.send({ message: "Empty title notes cannot be added to reminders" })
        }
        else if (reminderobj.description == "" && reminderobj.checkList.length==0) {
            res.send({ message: "Note content is missing" })
        }
        //saving note in favouritesColl
        else {
            //save
            await reminderobj.save()
            res.send({ message: "added to reminders" })
        }
    }
    //if note already in favouritesColl
    else {
        res.send({ message: "Already added to reminder" })
    }


}))



//http://localhost:5000/reminder/deletereminder
reminderApiObj.delete("/deletereminder/:email/:title",validateToken, errorHandler(async (req, res) => {
    //deleting note in favouritesColl
    let fav = await Reminder.deleteOne({$and: [{email:req.params.email},{title:req.params.title}]})
            res.send({ message: "removed from reminders" })
        

}))

//http://localhost:5000/reminder/removecheck/email
reminderApiObj.put("/removecheck/:email",validateToken,errorHandler(async(req,res)=>{
    let check=await Reminder.findOne({$and:[{email:req.params.email},{title:req.body.title}]})
    let checkList=check.checkList


    for(let [ind,i] of checkList.entries()){
        if(i==req.body.checkobj)
        {  
            checkList.splice(ind,1)
            let result=await Reminder.updateOne({$and:[{email:req.params.email},{title:req.body.title}]},{checkList:checkList})
            let reminder=await Reminder.find({email:req.params.email})
            res.send({message:reminder})
            break;
        }
    }
}))  

reminderApiObj.put("/removechecked/:email",validateToken,errorHandler(async(req,res)=>{
    let check=await Reminder.findOne({$and:[{email:req.params.email},{title:req.body.title}]})
    let checkedList=check.checkedList
    let checkList=check.checkList
   
    for(let [ind,i] of checkedList.entries()){
      
        if(i==req.body.checkedobj)
        {  
          checkList.push(req.body.checkedobj)
          console.log(checkList)
             checkedList.splice(ind,1)
           
            let result=await Reminder.updateOne({$and:[{email:req.params.email},{title:req.body.title}]},{checkList:checkList,checkedList:checkedList})
            let notes=await Reminder.find({$and:[{email:req.params.email},{status:true},{archive:true}]}) 
            res.send({message:notes})
            break;

           
        }
      
    }
    

}))  
//export favouriteApiObj
module.exports = reminderApiObj;