import React from 'react'
import ProgressBar from "./ProgressBar"
import { FaRegCheckCircle} from "react-icons/fa"

const ListItem = ({task}) => {
  
  return (
    <li className='list-item'>
      <div className='info-container'>
      <FaRegCheckCircle className='tick' />
      <p>{task.title}</p>
      <ProgressBar/>
      </div>
    <div className='button-container'>
    <button className='edit'>EDIT</button>
    <button className='delete'>DELETE</button>

    </div>

      </li>
  )
}

export default ListItem