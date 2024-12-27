import React from 'react'
import { TbError404 } from "react-icons/tb";
function NoNote({isModalOpen,setModalType,modalType,setIsModalOpen}) {
  const handleClick=()=>{
    setIsModalOpen(true)
    setModalType("add")
  }
  return (
    <div className='noNotesContainer'>
      <div className='noNotesBox'>
        <h1><TbError404 className='error'/></h1>
        <p>No Notes Found.</p>
        <p>Add Notes.</p>
      </div>
      <div className='addNoteButton' onClick={()=>handleClick()}><p>+</p></div>
    </div>
  )
}

export default NoNote