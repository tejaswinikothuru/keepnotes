//import mini express
const exp = require("express");
const favouriteApiObj = exp.Router();

//import express-async-handler
const errorHandler = require("express-async-handler");

//import token
const validateToken = require("../middlewares/verifyToken")

//body parsing
favouriteApiObj.use(exp.json())

//import favouritemodel
const Favourite = require("../models/Favourite");


//http://localhost:5000/favourite/getfavourites
favouriteApiObj.get("/getfavourites/:email", validateToken, errorHandler(async (req, res) => {
    //finding favourite notes from DB 
    let favouriteArray = await Favourite.find({ email: req.params.email })
    res.send({ message: favouriteArray })
}))

//http://localhost:5000/favourite/createfavourite
favouriteApiObj.post("/createfavourite", validateToken, errorHandler(async (req, res) => {
    //finding a note in favourtesColl with title and description
    let favouritefromdb = await Favourite.findOne({ $and: [{ email: req.body.email }, { title: req.body.title }] })
    //if note not found in favouritesColl
    if (favouritefromdb == null) {
        //create favouriteobj for favouritemodel
        let favouriteObj = new Favourite({
            email: req.body.email,
            title: req.body.title,
            description: req.body.description,
            checkList: req.body.checkList,
            checkedList: req.body.checkedList

        })

        if (favouriteObj.title == "") {
            res.send({ message: "Empty title notes cannot be added to favourites" })
        }
        else if (favouriteObj.description == "" && favouriteObj.checkList.length == 0) {
            res.send({ message: "Note content is missing" })
        }
        //saving note in favouritesColl
        else {
            //save
            await favouriteObj.save()
            res.send({ message: "added to favourites" })
        }
    }
    //if note already in favouritesColl
    else {
        res.send({ message: "Already added to favourites" })
    }


}))



//http://localhost:5000/favourite/deletefavourite
favouriteApiObj.delete("/removefavourite/:email/:title", validateToken, errorHandler(async (req, res) => {
    let title = req.params.title;
    //deleting note in favouritesColl
    let fav = await Favourite.deleteOne({ $and: [{ email: req.params.email }, { title: req.params.title }] })
    res.send({ message: "removed from favourites" })


}))

//http://localhost:5000/favourite/removecheck/email
favouriteApiObj.put("/removecheck/:email", validateToken, errorHandler(async (req, res) => {
    let check = await Favourite.findOne({ $and: [{ email: req.params.email }, { title: req.body.title }] })
    let checkList = check.checkList
    let checkedList = check.checkedList
    for (let [ind, i] of checkList.entries()) {
        if (i == req.body.checkobj) {
            //if checkobj matches in checkList array
            checkedList.push(req.body.checkobj)
            checkList.splice(ind, 1)
            //updating checkList and checkedList
            let result = await Favourite.updateOne({ $and: [{ email: req.params.email }, { title: req.body.title }] }, { checkList: checkList, checkedList: checkedList })
            let favourite = await Favourite.find({ email: req.params.email })
            res.send({ message: favourite })
            break;
        }
    }
}))

//http://localhost:5000/favourite/removechecked/email
favouriteApiObj.put("/removechecked/:email", validateToken, errorHandler(async (req, res) => {
    let check = await Favourite.findOne({ $and: [{ email: req.params.email }, { title: req.body.title }] })
    let checkedList = check.checkedList
    let checkList = check.checkList

    for (let [ind, i] of checkedList.entries()) {

        if (i == req.body.checkedobj) {
            //if checkobj matches in checkedList array
            checkList.push(req.body.checkedobj)
            checkedList.splice(ind, 1)
            //updating checkList and checkedList
            let result = await Favourite.updateOne({ $and: [{ email: req.params.email }, { title: req.body.title }] }, { checkList: checkList, checkedList: checkedList })
            let favourite = await Favourite.find({ email: req.params.email })
            res.send({ message: favourite })
            break;
        }
    }
}))

//export favouriteApiObj
module.exports = favouriteApiObj;