const mongoose=require("mongoose");

//creating schema
const UserSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    gender:String,
    dateOfBirth:String,
    email:String,
    password:String
})

//create model
const User=mongoose.model("user",UserSchema);


//export usermodel
module.exports=User;