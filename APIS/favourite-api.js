//import mini express
const exp = require("express");
const favouriteApiObj = exp.Router();

//import express-async-handler
const errorHandler = require("express-async-handler");

//import token
const validateToken=require("../middlewares/verifyToken")

//body parsing
favouriteApiObj.use(exp.json())

//import favouritemodel
const Favourite = require("../models/Favourite");

//import jsonwebtoken
const jwt = require("jsonwebtoken")

//http://localhost:5000/favourite/getfavourites
favouriteApiObj.get("/getfavourites/:email",validateToken, errorHandler(async (req, res) => {
    //finding notes from DB 
    let favouriteArray = await Favourite.find({email:req.params.email})
    res.send({ message: favouriteArray })
}))

//http://localhost:5000/favourite/createfavourite
favouriteApiObj.post("/createfavourite",validateToken, errorHandler(async (req, res) => {
    //finding a note in favourtesColl with title and description
    let favouritefrmdb = await Favourite.findOne({$and: [{email:req.body.email},{title: req.body.title}]})
    //if note not found in favouritesColl
    if (favouritefrmdb == null) {
        //create favouriteobj for favouritemodel
        let favouriteobj = new Favourite({
            email:req.body.email,
            title: req.body.title,
            description: req.body.description,
            checkList:req.body.checkList,
            checkedList:req.body.checkedList

        })

        if (favouriteobj.title == "") {
            res.send({ message: "Empty title notes cannot be added to favourites" })
        }
        else if (favouriteobj.description == "" && favouriteobj.checkList.length==0) {
            res.send({ message: "Note content is missing" })
        }
        //saving note in favouritesColl
        else {
            //save
            await favouriteobj.save()
            res.send({ message: "added to favourites" })
        }
    }
    //if note already in favouritesColl
    else {
        res.send({ message: "Already added to favourites" })
    }


}))



//http://localhost:5000/favourite/deletefavourite
favouriteApiObj.delete("/removefavourite/:email/:title",validateToken, errorHandler(async (req, res) => {
    let title = req.params.title;
    //deleting note in favouritesColl
    let fav = await Favourite.deleteOne({$and:[{email:req.params.email},{title:req.params.title}]})
            res.send({ message: "removed from favourites" })
        

}))

//http://localhost:5000/favourite/removecheck/email
favouriteApiObj.put("/removecheck/:email",validateToken,errorHandler(async(req,res)=>{
    let check=await Favourite.findOne({$and:[{email:req.params.email},{title:req.body.title}]})
    let checkList=check.checkList
    let checkedList=check.checkedList
    for(let [ind,i] of checkList.entries()){
        if(i==req.body.checkobj)
        {  
            checkedList.push(req.body.checkobj)
            checkList.splice(ind,1)
            let result=await Favourite.updateOne({$and:[{email:req.params.email},{title:req.body.title}]},{checkList:checkList,checkedList:checkedList})
            let favourite=await Favourite.find({email:req.params.email},{status:true},{archive:true})
            res.send({message:favourite})
            break;
        }
    }
}))  

favouriteApiObj.put("/removechecked/:email",validateToken,errorHandler(async(req,res)=>{
    let check=await Favourite.findOne({$and:[{email:req.params.email},{title:req.body.title}]})
    let checkedList=check.checkedList
    let checkList=check.checkList
   
    for(let [ind,i] of checkedList.entries()){
      
        if(i==req.body.checkedobj)
        {  
          checkList.push(req.body.checkedobj)
             checkedList.splice(ind,1)
           
            let result=await Favourite.updateOne({$and:[{email:req.params.email},{title:req.body.title}]},{checkList:checkList,checkedList:checkedList})
            let favourite=await Favourite.find({$and:[{email:req.params.email},{status:true},{archive:true}]}) 
            res.send({message:favourite})
            break;

           
        }
      
    }
    

}))  

//export favouriteApiObj
module.exports = favouriteApiObj;