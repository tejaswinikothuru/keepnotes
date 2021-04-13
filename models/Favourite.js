const mongoose=require("mongoose");

//creating schema
const FavouriteSchema=new mongoose.Schema({
    email:String,
    title:String,
    description:String,
    checkList:Array,
    checkedList:Array
})

//create model
const Favourite=mongoose.model("favourite",FavouriteSchema);


//export favouritemodel
module.exports= Favourite;