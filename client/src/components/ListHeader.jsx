import React from 'react'


const ListHeader = ({ListName}) => {

  const signOut=()=>{
    console.log("Signed Out")
  }

  return (
    <div className='list-header'>
      <h1>{ListName}</h1>
      <div className='button-container'>
        <button className='create'> ADD NEW </button>
        <button className='signout' onClick={signOut}> SIGN OUT</button>
      </div>
      </div>
  )
}

export default ListHeader