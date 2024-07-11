import React from 'react'
import Modal from './Modal'
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import ListModel from './ListModel';

const ListContainer = ( { getData } ) => {
  const [showModal,setShowModal]=useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(null)


  const signOut=()=>{
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
  }
  
  return (
    <div className='list-header'>
      <h1>Lists</h1>
      <div className='button-container'>
        <button className='create' onClick={()=>setShowModal(true)}> ADD NEW </button>
        <button className='signout' onClick={signOut}> SIGN OUT</button>
      </div>
      {showModal && (<ListModel  mode='create' setShowModal={setShowModal} getData={getData}/>) }
    </div>
  )
}

export default ListContainer