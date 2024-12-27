import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EditNote({handleModalClose,currentUser,setEditNote,editNote,notes,setNotes}) {
    const [error,setError] = useState("")
    const [content,setContent] = useState(editNote.content)
    const [title,setTitle] = useState(editNote.title)
    const [text,setText] = useState("")
    const [tags,setTags] = useState(editNote.tags)

    const navigate = useNavigate()


    const updateNote =async (e)=>{

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
        const response = await fetch(`http://localhost:8000/note/update/${editNote._id}`,{
          method:"PUT",
          headers:{
            "Content-Type" :"application/json",
            "Authorization" : `Bearer ${token}`
          },
          body:JSON.stringify({title,content,tags})
        })
        if(response.ok){
          const data = await response.json()
          setNotes(data.notes)
          toast.success("Note updated !",{autoClose:2000})
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
        <p>Edit a Note</p>

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
                    return <p key={i}>#{tag}<span className='cancel' onClick={()=>deleteTag(tag)}>x</span></p>
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
        
        <button type="submit" onClick={updateNote}>Edit Note</button>
    </form>
  )
}

export default EditNote