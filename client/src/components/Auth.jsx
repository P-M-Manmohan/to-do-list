// import React, { useState } from 'react'
// import {useCookies} from 'react-cookie'

const React = require('react');
const useState = React.useState;
const { useCookies } = require('react-cookie');

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [error,setError]=useState(null)
  const [email, setEmail]=useState(null)
  const [password, setPassword]=useState(null)
  const [confirmPassword, setConfirmPassword]=useState(null)
  const [isLogin,setIsLogin]=useState(true)

  const viewLogin=(status)=>{
    setError(null)
    setIsLogin(status)
  }

  const handleSubmit= async (e,endpoint)=>{

    e.preventDefault()

    if(!isLogin && password !==confirmPassword ){
      setError('Passwords dont match!')
      return
    }else if(!isLogin && password.length<8){
      setError('Password too short!')
      return
    }

    const userData={
      email: email,
      password: password
    }
    const response=await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`,{
      mode:"cors",
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(userData),
    })
    const data=await response.json()
    if(data.detail){
    setError(data.detail)
    }else{
      setCookie('Email',data.email)
      setCookie('AuthToken',data.token)
      window.location.reload()
    }
}




  return (
    <div className='auth-container'>
      <div className='auth-container-box'>

        <form>
          <h2>{isLogin? "Please Log In": "Please Sign up"}</h2>

          <input 
          type='email' 
          placeholder='email' 
          onChange={(e)=>setEmail(e.target.value)}
          />

          <input 
          type="password" 
          placeholder='password' 
          onChange={(e)=>setPassword(e.target.value)}
          />

          { !isLogin && <input 
          type="password" 
          placeholder='confirm password' 
          onChange={(e)=>setConfirmPassword(e.target.value)}
          /> }

          <input 
          type='submit' 
          className='create' 
          onClick={(e)=>handleSubmit(e,isLogin? 'login':'signup')
          }/>

          {error?<p>{error}</p>:null}
        </form>

        <div className='auth-options'>

          <button 
          onClick={()=> viewLogin(false)}
          style={{backgroundColor : isLogin? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
          >Sign Up</button>

          <button 
          onClick={()=> viewLogin(true)}
          style={{backgroundColor : !isLogin? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
          >Login</button>

        </div>
      </div>
    </div>
  )
}

module.exports = Auth