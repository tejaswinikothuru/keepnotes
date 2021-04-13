const mongoose=require("mongoose");

//creating schema
const NotesSchema=new mongoose.Schema({
    email:String,
    title:String,
    description:String,
    status:Boolean,
    archive:Boolean,
    checkList:Array,
    checkedList:Array,
})

//create model
const Notes=mongoose.model("note",NotesSchema);


//export notesmodel
module.exports=Notes;