import React, { useEffect, useState } from 'react'
import {useCookies} from 'react-cookie'
import InputPassword from '../components/InputPassword';
import { useNavigate } from 'react-router';

function Register() {
  const [fullName,setFullName] = useState("")
  const [email,setEmail] = useState("")
  const navigate = useNavigate();
  const [password,setPassword] = useState("")
  const [nameLabel,setNameLabel] = useState(false)
  const [emailLabel,setEmailLabel] = useState(false)
  const [passwordLabel,setPasswordLabel] = useState(false)
  const [error,setError] = useState("")

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate('/dashboard')
    }
  },[])

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(fullName == ""){
      setError("Full Name is required.")
      return 
    }
    if(email == ""){
      setError("Email is required.")
      return 
    }
    if(password == ""){
      setError("Password is required.")
      return 
    }
    setError("")
    const userData = {
      fullName,email,password
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}user/register`,{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
      })
      if(response.ok){
        const data = await response.json();
        console.log("Token from login ",data.token)
        localStorage.setItem("token",data.token)
        navigate('/dashboard')
      }else{
        const data = await response.json();
        setError(data.message)
      }
    } catch (error) {
      setError("An unexpected error took place .")
    }
  }

  const handleNameChange = (e)=>{
    setFullName(e.target.value)
  }
  useEffect(()=>{
    if(fullName != ""){
      setNameLabel(true);
    }
    else{
      setNameLabel(false);
    }
  },[fullName])
  useEffect(()=>{
    if(email != ""){
      setEmailLabel(true);
    }
    else{
      setEmailLabel(false);
    }
  },[email])
  return (
    <div className='loginContainer'>
      <form className='loginBlock' onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className='loginInputs'>
          {nameLabel && <label htmlFor='fullname' >Full Name</label>}
          <input type="text" style={nameLabel ? {border : "2px solid rgba(9, 96, 236, 0.845)"}:{}} name='fullName' placeholder='Full Name' value={fullName} onChange={handleNameChange}/>

          {emailLabel && <label htmlFor='email'>Email</label>}
          <input type="text" style={emailLabel ? {border : "2px solid rgba(9, 96, 236, 0.845)"}:{}} placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <InputPassword password={password} setPassword={setPassword} setPasswordLabel={setPasswordLabel} passwordLabel={passwordLabel}/>

        </div>
        <div className='errorBox'>
          <p>{error}</p>
        </div>
        <div className='buttons'>
          <button type='submit'>Register</button>
        </div>
        <div className='para'>
          Already have an account?<span onClick={()=>navigate('/login')}>Login.</span> 
        </div>
      </form>
    </div>
  )
}

export default Register