import React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

const ListModel = ({ mode,setShowModal,list }) => {
    const [cookies, setCookie,removeCookie]=useCookies(null)
    const editMode= mode==='edit'?true:false


  const [data,setData]=useState({
    user_email:editMode ? list.user_email : cookies.Email,
    title:editMode ? list.title : "",
    progress: editMode? list.progress : 0,
    date: editMode ? list.date: new Date()
  })

  const handleChange= (e)=>{
    const {name, value}=e.target;
    setData(data=>({
      ...data,
      [name]: value
    }))
  }

  // create new list
  const postData=async (e)=>{
    e.preventDefault()
    try{
        const response=await fetch(`${process.env.REACT_APP_SERVERURL}/new-list`,{
          mode:"cors",
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(data),
        });
        if(response.status===200){
          setShowModal(false)
          getData()
        }
    }catch(err){
      console.log("error in fetching",err)
    }
  }

  // edit list
  
  const editData=async(e)=>{
    e.preventDefault()
    try{
        const response=await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${list.id}`,{
        mode:"cors",
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data),
      });
      if(response.status===200){
        setShowModal(false)
        getData()
      }

    }catch(err){
      console.error(err)
    }
  }
  

  return (
    <div className='overlay'>
    <div className='modal'>
      <div className='form-title-container'>
        <h3>{`${mode} list`}</h3>
        <button onClick={()=>setShowModal(false)}>X</button>
      </div>
      <form>
        <input 
        required
        maxLength={30}
        placeholder='New list name'
        name="title"
        value={data.title}
        onChange={handleChange}
        />
        <br/>  
        <input className={mode} onClick={editMode? editData: postData} type='submit'/>
      </form>
    </div>
  </div>
  )
}

export default ListModel