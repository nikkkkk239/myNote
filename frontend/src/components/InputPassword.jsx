import React, { useEffect, useState } from 'react'
import { PiEyeThin,PiEyeSlashThin } from "react-icons/pi";

function InputPassword({password,setPassword,setPasswordLabel,passwordLabel}) {
    const [showPassword,setShowPassword] = useState(false)
    useEffect(()=>{
        if(password != ""){
            setPasswordLabel(true)
        }else{
            setPasswordLabel(false)
        }
    },[password])
  return (
    <>
    {passwordLabel && <label htmlFor='password'>Password</label>}
    <div className='passwordBox'>
        
        <input type={showPassword?"text":"password"} style={passwordLabel ? {border : "2px solid rgba(9, 96, 236, 0.845)"}:{}} name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>  
        {showPassword?<PiEyeThin className='eye' onClick={()=>{setShowPassword(!showPassword)}}/>:<PiEyeSlashThin className='eye' onClick={()=>{setShowPassword(!showPassword)}}/>}
        
    </div>
    </>
  )
}

export default InputPassword