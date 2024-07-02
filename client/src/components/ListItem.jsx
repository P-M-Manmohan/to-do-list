import { useState } from 'react'
import ProgressBar from "./ProgressBar"
import { FaRegCheckCircle} from "react-icons/fa"
import Modal from './Modal'

const ListItem = ({task}) => {
  
  const [showModal,setShowModal]=useState(false)

  return (
    <li className='list-item'>
      <div className='info-container'>
      <FaRegCheckCircle className='tick' />
      <p>{task.title}</p>
      <ProgressBar/>
      </div>
    <div className='button-container'>
    <button className='edit' onClick={()=>setShowModal(true)}>EDIT</button>
    <button className='delete'>DELETE</button>
    {showModal && <Modal mode='edit' setShowModal={setShowModal} task={task}/>}
    </div>

      </li>
  )
}

export default ListItem