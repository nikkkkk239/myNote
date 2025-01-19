import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { IoMdClose } from "react-icons/io";
function AddNote({handleModalClose,currentUser,notes,setNotes}) {
    const [error,setError] = useState("")
    const [content,setContent] = useState("")
    const [title,setTitle] = useState("")
    const [text,setText] = useState("")
    const [tags,setTags] = useState([])

    const navigate = useNavigate()
    const addNote =async (e)=>{

      e.preventDefault();
      const token = localStorage.getItem("token")
      if(!token){
        navigate('/login')
      }
      if(title == ""){
        setError("Title is required.")
        return;
      }
      if(content==""){
        setError("Content is required.")
        return;
      }
      setError("")
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}note/add`,{
          method:"POST",
          headers:{
            "Content-Type" :"application/json",
            "Authorization" : `Bearer ${token}`
          },
          body:JSON.stringify({title,content,tags})
        })
        if(response.ok){
          const data = await response.json()
          setNotes([...notes,data.note])
          handleModalClose();
        }
        else{
          const data = await response.json()
          setError(data.message)
        }
      } catch (error) {
        console.log(error)
        setError("An unexpected error occured.")
      }

    }


    const addTag = (e)=>{
      e.preventDefault();
      if(text == "" || text== " "){
        setError("Tag Field is empty.")
        return ;
      }
      setError("");

      setTags([...tags,text.toUpperCase()])
      setText("")
    }
    const deleteTag = (tag)=>{
      setTags(tags.filter((t)=>{
        return t != tag.toUpperCase()
      }))
    }
    
  return (
    <form className='add'>
      <div className='closeButton' onClick={()=>handleModalClose()}><IoMdClose/></div>
        <p>Add a Note</p>

        <div className='inputFields'>
            <div className='title'>
              <label htmlFor="title">Title</label>
              <input type="text" name='title' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Going to GYM.' />
            </div>
            <div className='textarea'>
              <label htmlFor="content">Content</label>
              <textarea name="content" value={content} placeholder='With her at 5 o clock.' onChange={(e)=>setContent(e.target.value)} style={{resize:'none'}} rows={6} id=""></textarea>
            </div>
            <div className='tags'>
              <div className='selectedTags'>{tags.length == 0? "No tags added.":
                <div className='addedTag'>
                  {tags.map((tag,i)=>{
                    return <p key={i}>#{tag}<span className='cancel' onClick={()=>deleteTag(tag)}><IoMdClose/></span></p>
                  })}
                </div>
              }</div>
              <label htmlFor="tags">Tags</label>
              <div className='toge'>
                <input type="text" name='tags'  value={text} onChange={(e)=>setText(e.target.value)}/>
                <button onClick={addTag}>+</button>
              </div>
              {error && <p className='error'>{error}</p>}
            </div>
        </div>
        
        <button type="submit" onClick={addNote}>Add Note</button>
    </form>
  )
}

export default AddNote