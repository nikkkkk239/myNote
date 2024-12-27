const express = require("express")

const route = express.Router();

const User = require("../model/user")
const Note = require("../model/note")

route.post('/add',async(req,res)=>{
    const {content,title,tags} = req.body;
    const userId = req.userId;
    const user =await User.findById(userId.id);
    if(!user){
        return res.status(403).json({err:true,message:"Unauthorized."})
    }
    if(!content) {
        return res.status(400).json({err:true,message:"Content is required ."})
    }
    if(!title){
        return res.status(400).json({err:true,message:"Title is required."})
    }
    const note = await Note.create({
        content,
        title,
        tags:tags ? tags : [],
        isPinned:false,
        createdBy:user._id
    })
    return res.status(200).json({err:false,message:"Note created.",note})
})

route.delete('/delete/:noteId',async(req,res)=>{
    const noteId = req.params.noteId;
    const userId = req.userId;

    const note = await Note.findById(noteId);
    if(!note){
        return res.status(404).json({err:true,message:"Note not found."})
    }
    await Note.findByIdAndDelete(noteId);
    const notes = await Note.find({createdBy:userId.id}).sort({isPinned:-1})
    return res.status(200).json({err:false,message:"Note deleted .",notes});

})
route.put('/update/:noteId',async(req,res)=>{
    const noteId = req.params.noteId;
    const userId = req.userId;
    const {content,title,tags} = req.body;

    if(!content || !title){
        return res.status(400).json({err:true,message:"No data provided to update ."})
    }
    const note = await Note.findById(noteId)
    if(!note){
        return res.status(404).json({err:true,message:"Note not found."})
    }
    const newNote = await Note.findByIdAndUpdate(noteId,{
        content:content,
        title:title,
        tags:tags
    })
    const notes = await Note.find({createdBy:userId.id}).sort({isPinned:-1})
    return res.status(200).json({err:false,message:"Note Updated.",notes})
})

route.put('/pin-note/:noteId',async(req,res)=>{
    const noteId = req.params.noteId;

    const userId = req.userId;
    const note = await Note.findById(noteId)
    
    if(!note){
        return res.status(404).json({err:true,message:"Note not found ."})
    }
    const updatedUser = await Note.findByIdAndUpdate(noteId,{isPinned:!note.isPinned})
    const notes = await Note.find({createdBy:userId.id}).sort({isPinned:-1})
    return res.status(200).json({err:false,
        message:updatedUser.isPinned ? "Note Unpinned.":"Note Pinned.",notes
    })

})
route.get("/getAllNotes",async(req,res)=>{
    const userId = req.userId;

    const notes = await Note.find({createdBy:userId.id}).sort({isPinned:-1})
    return res.status(200).json({err:false,message:"All Notes here.",notes})
})

module.exports = route