import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { TiPin } from "react-icons/ti";
import { TbMoodEmptyFilled } from "react-icons/tb";
function SearchPage({noteToBeSearched, isSearchBtnClicked , setIsSearchBtnClicked,notes,setNotes,setIsModalOpen,setModalType,setEditNote}) {
  const [notesFound,setNotesFound] = useState([])


  const handleDelete =async(id)=>{
    const token = localStorage.getItem("token")
    if(!token){
      navigate('/login')
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}note/delete/${id}`,{
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

  const handlePin=async(id)=>{
    const token = localStorage.getItem("token")
    if(!token){
      navigate('/login')
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}note/pin-note/${id}`,{
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

  useEffect(()=>{
    setNotesFound(notes.filter((note)=>{
      const fun = (note)=>{
        let isPresent = false;
        note.tags.map((tag)=>{
          if(tag == noteToBeSearched.toUpperCase()){
            isPresent = true;
          }
        })
        return isPresent;
      }
      return fun(note);
    }))
    console.log(notesFound);
    
  },[noteToBeSearched])

  useEffect(()=>{
    setNotesFound(notes.filter((note)=>{
      const fun = (note)=>{
        let isPresent = false;
        note.tags.map((tag)=>{
          if(tag == noteToBeSearched.toUpperCase()){
            isPresent = true;
          }
        })
        return isPresent;
      }
      return fun(note);
    }))
  },[notes])
  return (
    <div className='container'>
      {noteToBeSearched==""?
      <div className='searchContainer'>
        <div className='noSearchResult'>
          <TbMoodEmptyFilled className='icon'/>
          <p>Search list is <span>EMPTY</span> .</p>
          <p>Search notes using tag names. </p>
        </div>
      </div>
      : notesFound.length==0  ?
      <div className='searchContainer'>
        <div className='noSearchResult'>
          <TbMoodEmptyFilled className='icon'/>
          <p>Search list is <span>EMPTY</span> .</p>
          <p>Search notes using tag names. </p>
        </div>
      </div> :  <div className='notesContainer'>
        {notesFound && notesFound.map((note,i)=>{
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
    }
    </div>
  )
}

export default SearchPage