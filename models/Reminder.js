const mongoose=require("mongoose");

//creating schema
const ReminderSchema=new mongoose.Schema({
    email:String,
    title:String,
    description:String,
    checkList:Array,
    checkedList:Array
})

//create model
const Reminder=mongoose.model("reminder",ReminderSchema);


//export favouritemodel
module.exports= Reminder;