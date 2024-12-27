import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { ToastContainer, toast } from 'react-toastify';
import { Outlet, useNavigate } from 'react-router';
import { ImCancelCircle } from "react-icons/im";

import Modal from 'react-modal'
import EditNote from '../components/EditNote'
import AddNote from '../components/AddNote';
function Home({currentUser,setCurrentUser,isAnimation,setIsAnimation,notes,setNotes,modalType,setModalType,isModalOpen,setIsModalOpen,editNote,setEditNote,setNoteToBeSearched,noteToBeSearched , isSearchBtnClicked , setIsSearchBtnClicked}) {
  const navigate = useNavigate();
  // const [currentUser,setCurrentUser] = useState(null)
  // const [notes,setNotes] = useState([])
  // const [modalType,setModalType] = useState("")
  // const [isModalOpen,setIsModalOpen] = useState(false)
  // const [editNote,setEditNote] = useState(null);

  const handleModalClose = ()=>{
    setIsModalOpen(false)
  }
  useEffect(()=>{
    const token = localStorage.getItem("token");
    const func = async()=>{
      try {

        console.log("Token from home ",token)
        const response = await fetch('http://localhost:8000/user/getUser',{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`
          },
        })
        if(response.ok){
          const data = await response.json();
          setCurrentUser(data.user)
          console.log("User data from home ",data.user)
        }else{
          console.log("Unauth from home.")
          navigate('/login')
        }
      } catch (error) {
        console.log(error)
      }
    }
    func()
    const fun =async ()=>{
      try {
        const response = await fetch('http://localhost:8000/note/getAllNotes',{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        if(response.ok){
          const data = await response.json();
          console.log('Notes data from home :',data);
          setNotes(data.notes)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fun();
  },[])

  const handleLogOut=()=>{
    localStorage.removeItem('token')
    setIsAnimation(false)
    navigate('/login')
  }
  useEffect(()=>{
    if(isAnimation){
      document.querySelector('.sideBar').classList.add("animate")
      document.querySelector('.sideBar').classList.remove("back")
    }else{
      document.querySelector('.sideBar').classList.add("back")
      document.querySelector('.sideBar').classList.remove("animate")
    }
  },[isAnimation])
  const handleCancelClick=()=>{
    setIsAnimation(false)
  }
  return (
    <div className='homie'>
      <div className='sideBar'>
        <div className='cancelBtn' onClick={handleCancelClick}><ImCancelCircle/></div>
          <div className="right">
              <div className='initials'>
                  {currentUser?.fullName.split(" ").length >=2 ? 
                  currentUser?.fullName.split(" ")[0][0] + " " + currentUser?.fullName?.split(" ")[1][0] : 
                  currentUser?.fullName.split(" ")[0][0]}
              </div>
              <div className='yes'>
                  <div className="name">{currentUser?.fullName.split(" ")[0]}</div>
                  <div className='logout' onClick={handleLogOut}>Logout</div>
              </div>
        </div>
      </div>
      <NavBar isSearchBtnClicked={isSearchBtnClicked} setIsSearchBtnClicked={setIsSearchBtnClicked} notes={notes} isAnimation={isAnimation} setIsAnimation={setIsAnimation} setNotes={setNotes} currentUser={currentUser} noteToBeSearched={noteToBeSearched} setNoteToBeSearched={setNoteToBeSearched}/>
      {/* Notes component. */}

      
      <Outlet/>
      
      {modalType == "add"? 
      <Modal 
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        style={
          {
            overlay:{backgroundColor:"rgba(0,0,0,0.2)",},
          }
        } 
        ariaHideApp={false}
        className="modal"
      >
        <AddNote notes={notes} modalType={modalType} setModalType={setModalType} setNotes={setNotes} handleModalClose={handleModalClose} currentUser={currentUser}/>
      </Modal> : 
      <Modal 
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        style={
          {
            overlay:{backgroundColor:"rgba(0,0,0,0.2)",},
          }
        } 
        ariaHideApp={false}
        className="modal"
      >
        <EditNote notes={notes} modalType={modalType} setModalType={setModalType} setNotes={setNotes} editNote={editNote} setEditNote={setEditNote} handleModalClose={handleModalClose} currentUser={currentUser}/>
      </Modal>}
      <ToastContainer className="toast" position='bottom-right'/>
    </div>
  )
}

export default Home