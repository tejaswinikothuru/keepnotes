const mongoose=require("mongoose");

//creating schema
const NotesSchema=new mongoose.Schema({
    title:String,
    description:String,
    status:Boolean,
    archive:Boolean
})

//create model
const Notes=mongoose.model("notes",NotesSchema);

//export notesmodel
module.exports= Notes;