
const mongoose= require("mongoose");
//creating schema
const FavouriteSchema=new mongoose.Schema({
    title:String,
    description:String
})    
//create model
const Favourite=mongoose.model("favourite",FavouriteSchema);
//export favouritemodel

module.exports=Favourite;
