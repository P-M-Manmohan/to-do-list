import { useState } from "react"

const Modal = ({mode,setShowModal,task}) => {
  
  const editMode= mode==='edit'?true:false


  const [data,setData]=useState({
    user_email:editMode ? task.user_email : "bob@gmail.com",
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
  const postData=async ()=>{
    try{
        console.log("posting data")
        const response=await fetch(`http://localhost:4000/todos`,{
          method:"POST",
          headers :{'content-type':'application/json'},
          body: JSON.stringify(data),
          mode: "cors"
        });
      console.log(response);
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
          <input className={mode} onClick={editMode? null: postData} type='submit'/>
        </form>
      </div>
    </div>
  )
}

export default Modal