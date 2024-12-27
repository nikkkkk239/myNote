const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },title:{
        type:String,
        required:true,
    },tags:{
        type:[String],
        default:[]
    }
    ,isPinned:{
        type:Boolean,
        default:false,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{timestamps:true})

const Note = mongoose.model("notes",noteSchema)
module.exports = Note;