import React,{useEffect} from 'react'
import NoNote from '../components/NoNote'
import Notes from '../components/Notes'
function NotePage({currentUser, isSearchBtnClicked , setIsSearchBtnClicked,setCurrentUser,notes,setNotes,modalType,setModalType,isModalOpen,setIsModalOpen,editNote,setEditNote,setNoteToBeSearched})
{
  useEffect(()=>{
    setNoteToBeSearched("")
    setIsSearchBtnClicked(false)
  },[])
  return (
    <div>
      {
         notes.length == 0 ?
         <NoNote modalType={modalType} setModalType={setModalType} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> 
        :
        <Notes modalType={modalType} setModalType={setModalType} isModalOpen={isModalOpen} setNotes={setNotes} setEditNote={setEditNote} editNote={editNote} setIsModalOpen={setIsModalOpen} notes={notes}/>
      } 
    </div>
  )
}

export default NotePage