// import { useState } from 'react'
// import ProgressBar from "./ProgressBar"
// import { FaRegCheckCircle} from "react-icons/fa"
// import Modal from './Modal'

const { useState } = require('react');
const ProgressBar = require('./ProgressBar');
const { FaRegCheckCircle } = require('react-icons/fa');
const Modal = require('./Modal');


const ListItem = ({task,getData}) => {
  
  const [showModal,setShowModal]=useState(false)
  const deleteItem=async()=>{
    const response= await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
      method: "DELETE"
    })
    if(response.status===200){
      getData()
    }
  }
  return (
    <li className='list-item'>
      <div className='info-container'>
      <FaRegCheckCircle className='tick' />
      <p className='task-title'>{task.title}</p>
      </div>
    <div className='button-container'>
      <ProgressBar progress={task.progress}/>
    <button className='edit' onClick={()=>setShowModal(true)}>EDIT</button>
    <button className='delete' onClick={deleteItem}>DELETE</button>
    {showModal && <Modal mode='edit' setShowModal={setShowModal} getData={getData} task={task}/>}
    </div>

      </li>
  )
}

module.exports =ListItem