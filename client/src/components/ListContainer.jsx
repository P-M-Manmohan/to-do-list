import React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import ListModel from './ListModel';
import { FaRegCheckCircle } from 'react-icons/fa';
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom'

const ListContainer = ( { lists,getLists } ) => {
  const [showModal,setShowModal]=useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(null)

  const deleteItem=async(e)=>{
    e.preventDefault()
    const response= await fetch(`${process.env.REACT_APP_SERVERURL}/lists/${lists.id}`,{
      method: "DELETE"
    })
    if(response.status===200){
      getLists()
    }
  }


  return (
<>
    <li className='list-item'>
  <Link to={`/list/${lists.id}`}>
      <div className='info-container'>
        <FaRegCheckCircle className='tick' />
        <p className='task-title'>{lists.title}</p>
      </div>
      <div className='button-container'>
        <ProgressBar progress={lists.progress}/>
        <button className='edit' onClick={(e)=>{
          e.preventDefault();
          setShowModal(true)}}>EDIT</button>
        <button className='delete' onClick={deleteItem}>DELETE</button>
      </div>
   </Link>
   </li>
        {showModal && <ListModel mode='edit' setShowModal={setShowModal} getLists={getLists} list={lists}/>}
  </>
      )
}

export default ListContainer