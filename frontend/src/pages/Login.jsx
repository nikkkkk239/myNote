import React, { useEffect, useState } from 'react'
import InputPassword from '../components/InputPassword'
import { useNavigate } from 'react-router'
function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword]= useState("")
  const [passwordLabel,setPasswordLabel] = useState(false)
  const [emailLabel,setEmailLabel] = useState(false)
  const [error,setError] = useState("")
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate('/dashboard')
    }
  },[])
  const navigate = useNavigate()

  const handleSubmit=async (e)=>{
    e.preventDefault();

    if(email == ""){
      setError("Email required .")
      return;
    }
    if(password==""){
      setError("Password required.")
      return ;

    }
    setError("")
    const userData = {
      email,password
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
      })
      if(response.ok){
        const data = await response.json();
        localStorage.setItem("token",data.token)
        navigate('/dashboard')
      }
      else{
        const data = await response.json();
        if(data.err){
          setError(data.message)
        }
      }
    } catch (error) {
      setError("An unexpected Error occured .")
    }
  }
  useEffect(()=>{
    if(email!=""){
      setEmailLabel(true);
    }else{
      setEmailLabel(false)
    }
  },[email])
  return (
    <div className='loginContainer'>
      <form className='loginBlock' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='loginInputs'>
          {emailLabel && <label htmlFor='email'>Email</label>}
          <input type="text" style={emailLabel ? {border : "2px solid rgba(9, 96, 236, 0.845)"}:{}} placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <InputPassword password={password} setPassword={setPassword} setPasswordLabel={setPasswordLabel} passwordLabel={passwordLabel}/>

        </div>
        <div className='errorBox'>
          <p>{error}</p>
        </div>
        <div className='buttons'>
          <button type='submit'>Login</button>
        </div>
        <div className='para'>
          Don't have an account?<span onClick={()=>navigate('/register')}>Register.</span> 
        </div>
      </form>
    </div>
  )
}

export default Login