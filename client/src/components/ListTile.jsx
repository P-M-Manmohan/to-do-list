import React from 'react'
import ProgressBar from './ProgressBar'
const ListTile = (task) => {
  return (
    <>
        <p>{task.title}</p>
        <ProgressBar progress={task.progress}/>
    </>
  )
}

export default ListTile