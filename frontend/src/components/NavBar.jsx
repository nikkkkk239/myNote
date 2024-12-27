import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

import { useNavigate } from 'react-router';
function NavBar({isAnimation,setIsAnimation,notes,setNoteToBeSearched,noteToBeSearched,setNotes, currentUser,isSearchBtnClicked,setIsSearchBtnClicked}) {
    
    const handleMenuClicked=()=>{
        setIsAnimation(true)
    }
    // const [initial,setInitial] = useState("")
    // const [nameArray,setNameArray] = useState([])
    // useEffect(()=>{
    //     setNameArray(currentUser?.fullName.split(" "))
    // },[])
    const navigate = useNavigate()
    const handleLogOut =()=>{
        localStorage.removeItem("token");
        navigate('/login')
    }
    const handleClick=()=>{
        navigate('/dashboard/search')
    }

    const handle=()=>{
        setIsSearchBtnClicked(!isSearchBtnClicked)
        navigate('/dashboard/search')
    }
    useEffect(()=>{
        if(isSearchBtnClicked){
            document.querySelector('.logo').classList.add("moveUp")
            document.querySelector('.inputFromUp').classList.add("upAni")
        }
        else{
            document.querySelector('.logo').classList.remove("moveUp")
            document.querySelector('.inputFromUp').classList.remove("upAni")
        }
    },[isSearchBtnClicked])
    
  return (
    <div className="navbar">
         <div className="logo" onClick={()=>navigate('/dashboard')}>MyNote</div>
        <div className='inputFromUp'><input placeholder='search...' value={noteToBeSearched} onChange={(e)=>setNoteToBeSearched(e.target.value)} type="text" /></div>
        <div className="search" onClick={handleClick}>
            <input type="text" placeholder='search...' value={noteToBeSearched} onChange={(e)=>setNoteToBeSearched(e.target.value)}/>
            <button className='searchButton'><IoSearch/></button>
        </div>
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
        <div className='importantIcons'>
            <div className='searchIcon' onClick={handle}>
                {!isSearchBtnClicked ? <IoSearch/> : <IoMdClose/>}
            </div>
            <div className='menu' onClick={handleMenuClicked}>
                <RxHamburgerMenu/>
            </div>
        </div>
        
    </div>
  )
}

export default NavBar