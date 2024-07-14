// import { useState } from 'react'
// import Modal from './Modal'
// import { useCookies } from 'react-cookie'


import Modal from './Modal';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ListHeader = ({getData,listId}) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModal,setShowModal]=useState(false);
  const [ title,setTitle ] = useState(null);

  const getTitle = async ()=> {       
    try{
        const result= await fetch(`${process.env.REACT_APP_SERVERURL}/list/${listId}`);
        const json = await result.json();
        setTitle(json[0].title)
    }catch(err){
        console.error(err)
    }
}


  const signOut=()=>{
    removeCookie('Email', { path: '/' })
    removeCookie('AuthToken', { path: '/' })
    window.location.reload()
  }

  getTitle();
  return (
    <div className='list-header'>
      <div className='back-button'>
      <Link to={'/'}>
      <FaArrowLeft className='left-arrow'/>
      </Link>
      <h1 className='list-title'>{`${title}`}</h1>
      </div>
      <div className='button-container'>
        <button className='create' onClick={()=>setShowModal(true)}> ADD NEW </button>
        <button className='signout' onClick={signOut}> SIGN OUT</button>
      </div>
      {showModal && (<Modal mode='create' Id={listId} setShowModal={setShowModal} getData={getData}/>) }
    </div>
  )
}

export default ListHeader