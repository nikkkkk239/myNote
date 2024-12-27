import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { TiPin } from "react-icons/ti";
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import 'react-toastify/dist/ReactToastify.css';
function Notes({notes,isSearched,noteToBeSearched,setNoteToBeSearched,editNote,setEditNote,isModalOpen,modalType,setModalType,setNotes,setIsModalOpen}) {
  const navigate = useNavigate()

  const handleDelete =async(id)=>{
    const token = localStorage.getItem("token")
    if(!token){
      navigate('/login')
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/note/delete/${id}`,{
        method:"DELETE",
        headers:{
          "Authorization":`Bearer ${token}`,
        }
      })
      if(response.ok){
        const data = await response.json();
        console.log("response after deleting ",data)
        setNotes(data.notes);
        toast.success("Note Deleted!", { autoClose: 2000 });
      }else{
        const data = await response.json();
        toast.error(data.message,{autoClose:2000});
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occured.",{autoClose:2000})
    }
  }

  const handlePin=async(id,isPinned)=>{
    const token = localStorage.getItem("token")
    if(!token){
      navigate('/login')
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/note/pin-note/${id}`,{
        method:"PUT",
        headers:{
          "Authorization":`Bearer ${token}`,
        },
      })
      if(response.ok){
        const data = await response.json();
        console.log("response after pinning : ",data)
        setNotes(data.notes);
        toast.success(data.message, { autoClose: 2000 });
      }else{
        const data = await response.json();
        toast.error(data.message,{autoClose:2000});
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occured.",{autoClose:2000})
    }

  }

  const handleEditClick=(note)=>{
    setIsModalOpen(true)
    setModalType("edit")
    setEditNote(note)
  }

  const handleClick = ()=>{
    setIsModalOpen(true)
    setModalType("add")
  }
  

  return (

    <div className='container'>
      {!isSearched &&<div className='addNoteBtn' onClick={()=>handleClick()}>
        <p>+</p>
      </div>}
      <div className='notesContainer'>
        {notes && notes.map((note,i)=>{
          return <div key={i} className='note' style={note.isPinned ? {border:"1px solid rgb(9, 96, 236)"}:{}}>
            <h1>{note.title.slice(0,15)}</h1>
            <div className='content'><p >{note.content.slice(0,35)}</p></div>

            {note?.tags?.length!=0 && <div className='tags'>
              {note.tags.map((tag,i)=>{
                return <div className="tag" key={i}>
                  #{tag}
                </div>
              })}
            </div>}
            <div className="buttons">
              <MdDelete className='icon1' onClick={()=>handleDelete(note._id)}/>
              <MdEdit className='icon2' onClick={()=>handleEditClick(note)}/>
              <TiPin className='icon3' onClick={()=>handlePin(note._id,note.isPinned)} style={note.isPinned ? {color:"rgb(9, 96, 236)"}:{}}/>
            </div>
          </div>
        })}
        
      </div>
      
    </div>
  )
}

export default Notes