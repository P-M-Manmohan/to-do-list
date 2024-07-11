import React from 'react'
import ListTile from './ListTile'
import ListContainer from './ListContainer';
const Lists = ( { getData } ) => {
    
    const listGroup=true;
    return (
    <>
    <ListContainer getData={getData}/>
    </>
  )
}

export default Lists