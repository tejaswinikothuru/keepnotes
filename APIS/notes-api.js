//import mini express
const exp = require("express");
const notesApiObj = exp.Router();

//import express-async-handler
const errorHandler = require("express-async-handler");

//import token
const validateToken=require("../middlewares/verifyToken")

//body parsing
notesApiObj.use(exp.json())

//import notesmodel
const Notes = require("../models/Notes");


//http://localhost:5000/notes/getnotes/email
notesApiObj.get("/getnotes/:email",validateToken, errorHandler(async (req, res) => {
    //finding notes with status true 
    let notesArray = await Notes.find({$and: [{ status: true },{archive:true},{email:req.params.email}]})
    res.send({ message: notesArray })
}))

//http://localhost:5000/notes/createnotes
notesApiObj.post("/createnotes",validateToken,errorHandler(async (req, res) => {

    let titlefrmdb=await Notes.findOne({$and:[{title:req.body.title},{email:req.body.email}]})

  if(titlefrmdb==null){
        //create notesobj for notesmodel
    let notesobj = new Notes({
        email:req.body.email,
        title: req.body.title,
        description: req.body.description,
        status: true,
        archive:true,
       checkList:req.body.checkList, 
       

    })
    if (notesobj.title =="") {
        res.send({ message: "Empty title notes cannot be saved" })
    }
    else if(notesobj.description=="" && notesobj.checkList.length==0){
        res.send({ message: "Note content is missing" })
    }
   
    else {
        //save
        console.log(notesobj)
        await notesobj.save()
        res.send({ message: "notes created" })
    }
  }
  else{
      res.send({message:"title already exists"})
  }


}))



//http://localhost:5000/notes/movetotrash
notesApiObj.post("/movetotrash",validateToken, errorHandler(async (req, res) => {
    let newNotesObj = req.body;
    //updating status to false
   
    let status = await Notes.findOneAndUpdate({ $and: [{ title:newNotesObj.title },{archive:true},{email:newNotesObj.email}], "status": true }, { status: false })
    res.send({ message: "soft deleted" })


}))

//http://localhost:5000/notes/getdeletednotes
notesApiObj.get("/gettrashnotes/:email",validateToken, errorHandler(async (req, res) => {
    //finding notes with status false
    let notesArray = await Notes.find({$and:[{ status: false},{email:req.params.email}] })
    res.send({ message: notesArray })
}))

//http://localhost:5000/notes/restorenote
notesApiObj.post("/restorenote",errorHandler(async (req, res) => {
    let newNotesObj = req.body;
    //updating status to true
    let status = await Notes.findOneAndUpdate({ $and: [{ title: newNotesObj.title },{archive:true},{email:newNotesObj.email}], "status": false }, { status: true })
    res.send({ message: "note restored" })

}))


//Archive
//http://localhost:5000/notes/archivenote
notesApiObj.post("/archivenote",validateToken, errorHandler(async (req, res) => {
    let newNotesObj = req.body;
    //updating status to true
    let status = await Notes.findOneAndUpdate({ $and: [{ title:newNotesObj.title },{status:true},{email:newNotesObj.email}], "archive": true }, { archive: false })
    res.send({ message: "Note Archived" })

}))

//http://localhost:5000/notes/getarchivednotes/email
notesApiObj.get("/getarchivednotes/:email",validateToken,errorHandler(async (req, res) => {
    //finding notes with status false
    let notesArray = await Notes.find({$and:[{ archive: false},{email:req.params.email}] })
    res.send({ message: notesArray })
}))


//http://localhost:5000/notes/unarchive
notesApiObj.post("/unarchive",validateToken, errorHandler(async (req, res) => {
    let newNotesObj = req.body;
    //updating status to true
    let status = await Notes.findOneAndUpdate({ $and: [{ title: newNotesObj.title },{status:true},{email:newNotesObj.email}], "archive": false }, { archive: true })
    res.send({ message: "unarchived" })

}))

//http:localhost:5000/notes/permanentdelete
notesApiObj.delete("/permanentdelete/:email/:title",validateToken,errorHandler(async(req,res)=>{
      let obj= await Notes.deleteOne({$and:[{email:req.params.email},{title:req.params.title}]})
       res.send({message:"deleted permanetly"})
}))

//http://localhost:5000/notes/removecheck/email
  notesApiObj.put("/removecheck/:email",validateToken,errorHandler(async(req,res)=>{
      let check=await Notes.findOne({$and:[{email:req.params.email},{title:req.body.title}]})
      let checkList=check.checkList
      let checkedList=check.checkedList

      for(let [ind,i] of checkList.entries()){
        
          if(i==req.body.checkobj)
          {  
            checkedList.push(req.body.checkobj)
            console.log(checkedList)
               checkList.splice(ind,1)
             
              let result=await Notes.updateOne({$and:[{email:req.params.email},{title:req.body.title}]},{checkList:checkList,checkedList:checkedList})
              let notes=await Notes.find({$and:[{email:req.params.email},{status:true},{archive:true}]}) 
              res.send({message:notes})
              break;

             
          }
        
      }
      

  }))  

  notesApiObj.put("/removechecked/:email",validateToken,errorHandler(async(req,res)=>{
    let check=await Notes.findOne({$and:[{email:req.params.email},{title:req.body.title}]})
    let checkedList=check.checkedList
    let checkList=check.checkList
   
    for(let [ind,i] of checkedList.entries()){
      
        if(i==req.body.checkedobj)
        {  
          checkList.push(req.body.checkedobj)
          console.log(checkList)
             checkedList.splice(ind,1)
           
            let result=await Notes.updateOne({$and:[{email:req.params.email},{title:req.body.title}]},{checkList:checkList,checkedList:checkedList})
            let notes=await Notes.find({$and:[{email:req.params.email},{status:true},{archive:true}]}) 
            res.send({message:notes})
            break;

           
        }
      
    }
    

}))  

//export notesApiObj
module.exports = notesApiObj;