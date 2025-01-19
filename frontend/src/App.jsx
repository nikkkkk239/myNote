import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route} from "react-router-dom"
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import NotePage from './pages/NotePage'
import SearchPage from './pages/SearchPage'

function App() {
  const [currentUser,setCurrentUser] = useState(null)
  const [notes,setNotes] = useState([])
  const [modalType,setModalType] = useState("")
  const [isAnimation,setIsAnimation] = useState(false)
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [editNote,setEditNote] = useState(null);
  const [noteToBeSearched,setNoteToBeSearched] = useState("")
  const [isSearchBtnClicked,setIsSearchBtnClicked] = useState(false)
  return (
    <>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path="/dashboard" element={<Home currentUser={currentUser} notes={notes} setCurrentUser={setCurrentUser} isAnimation={isAnimation} setIsAnimation={setIsAnimation} setNotes={setNotes} setModalType={setModalType} modalType={modalType} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setEditNote={setEditNote} editNote={editNote} noteToBeSearched={noteToBeSearched} setNoteToBeSearched={setNoteToBeSearched} isSearchBtnClicked={isSearchBtnClicked} setIsSearchBtnClicked={setIsSearchBtnClicked}/>}>
          <Route index path='/dashboard' element={<NotePage currentUser={currentUser} notes={notes} setCurrentUser={setCurrentUser} setNotes={setNotes} setModalType={setModalType} modalType={modalType} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setEditNote={setEditNote} editNote={editNote} setNoteToBeSearched={setNoteToBeSearched} isSearchBtnClicked={isSearchBtnClicked} setIsSearchBtnClicked={setIsSearchBtnClicked}/>}/>

          <Route path="/dashboard/search" element={<SearchPage setIsModalOpen={setIsModalOpen} setModalType={setModalType} setEditNote={setEditNote} noteToBeSearched={noteToBeSearched} setNotes={setNotes} notes={notes} isSearchBtnClicked={isSearchBtnClicked} setIsSearchBtnClicked={setIsSearchBtnClicked}/>}/>
        </Route>
        
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
