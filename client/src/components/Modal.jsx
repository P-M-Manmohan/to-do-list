// import { useState } from "react"
// import { useCookies } from "react-cookie"

const { useState } = require("react");
const { useCookies } = require("react-cookie");

const Modal = ({mode,setShowModal,getData,task}) => {
  const [cookies, setCookie,removeCookie]=useCookies(null)
  const editMode= mode==='edit'?true:false


  const [data,setData]=useState({
    user_email:editMode ? task.user_email : cookies.Email,
    title:editMode ? task.title : "",
    progress: editMode? task.progress : 50,
    date: editMode ? task.date: new Date()
  })

  const handleChange= (e)=>{
    const {name, value}=e.target;
    setData(data=>({
      ...data,
      [name]: value
    }))
  }

  // create new todo
  const postData=async (e)=>{
    e.preventDefault()
    try{
        const response=await fetch(`${process.env.REACT_APP_SERVERURL}/todos`,{
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


  // edit todo
  
  const editData=async(e)=>{
    e.preventDefault()
    try{
        const response=await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
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
          <h3>Let's {mode} Your Task</h3>
          <button onClick={()=>setShowModal(false)}>X</button>
        </div>
        <form>
          <input 
          required
          maxLength={30}
          placeholder='Enter the task'
          name="title"
          value={data.title}
          onChange={handleChange}
          />
          <br/>
          <label htmlFor='range'>Drag to select your current progress</label>
          <input 
          required
          type='range'
          id='range'
          min='0'
          max='100'
          name='progress'
          value={data.progress}
          onChange={handleChange}
          />
          {/*  */}
          <input className={mode} onClick={editMode? editData: postData} type='submit'/>
        </form>
      </div>
    </div>
  )
}
module.exports=Modal;