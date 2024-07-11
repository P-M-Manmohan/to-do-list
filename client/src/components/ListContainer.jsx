import React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import ListModel from './ListModel';
import { FaRegCheckCircle } from 'react-icons/fa';
import ProgressBar from './ProgressBar';

const ListContainer = ( { lists,getLists } ) => {
  const [showModal,setShowModal]=useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(null)

  const deleteItem=async()=>{
    const response= await fetch(`${process.env.REACT_APP_SERVERURL}/lists/${lists.id}`,{
      method: "DELETE"
    })
    if(response.status===200){
      getLists()
    }
  }

  const showList=()=>{
    
  }

  return (
    <li className='list-item' onClick={showList}>
      <div className='info-container'>
        <FaRegCheckCircle className='tick' />
        <p className='task-title'>{lists.title}</p>
      </div>
      <div className='button-container'>
        <ProgressBar progress={lists.progress}/>
        <button className='edit' onClick={()=>setShowModal(true)}>EDIT</button>
        <button className='delete' onClick={deleteItem}>DELETE</button>
        {showModal && <ListModel mode='edit' setShowModal={setShowModal} getLists={getLists} list={lists}/>}
      </div>
   </li>
  )
}

export default ListContainer