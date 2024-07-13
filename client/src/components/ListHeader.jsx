// import { useState } from 'react'
// import Modal from './Modal'
// import { useCookies } from 'react-cookie'


import Modal from './Modal';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ListHeader = ({ListName,getData}) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [showModal,setShowModal]=useState(false)

  const signOut=()=>{
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
  }

  return (
    <div className='list-header'>
      <div className='back-button'>
      <Link to={'/'}>
      <FaArrowLeft className='left-arrow'/>
      </Link>
      <h1 className='list-title'>{ListName}</h1>
      </div>
      <div className='button-container'>
        <button className='create' onClick={()=>setShowModal(true)}> ADD NEW </button>
        <Link to={'/'}>
        <button className='signout' onClick={signOut}> SIGN OUT</button>
        </Link>
      </div>
      {showModal && (<Modal mode='create' setShowModal={setShowModal} getData={getData}/>) }
    </div>
  )
}

export default ListHeader