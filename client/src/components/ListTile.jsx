import React from 'react'
import ProgressBar from './ProgressBar'
import { FaRegCheckCircle } from 'react-icons/fa'

const ListTile = (task) => {
  return (
    <>
        <FaRegCheckCircle className='tick' />
        <p>{task.title}</p>
        <ProgressBar progress={task.progress}/>
    </>
  )
}

export default ListTile