const mongoose=require("mongoose");

//creating schema
const ReminderSchema=new mongoose.Schema({
    title:String,
    description:String
})

//create model
const Reminder=mongoose.model("reminder",ReminderSchema);

//export remindermodel
module.exports= Reminder;