import { useEffect, useState } from "react"
import ListHeader from "./components/ListHeader"
import ListItem from "./components/ListItem"
import Auth from "./components/Auth"
import { useCookies } from 'react-cookie'

const App=()=> {
  const [cookies, setCookie, removeCookie]=useCookies(null)
  const userEmail= cookies.Email
  const authToken= cookies.AuthToken;
  const [tasks,setTasks]=useState(null)

  const getData= async ()=>{
    try{
        const result = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
        const json=await result.json();
        setTasks(json)
        
        }catch(err){
          console.log(err)
        }
    }

    useEffect(()=> 
    {
      if(authToken){
      getData()
      }
    }  ,[])
  
  const sortedTasks =tasks?.sort((a,b)=> new Date(a.date)-new Date(b.date))
  return (
    <div className="app">

      {!authToken && <Auth/>}

      { authToken&&
      <>
      <ListHeader  ListName={'Holiday'} getData={getData}/>
      <p className="username">Welcome back {userEmail}</p>
      { sortedTasks?.map((task)=><ListItem key={task.id} task={task} getData={getData}/>) }
      <p className="copyright">© Project 2</p>
      </>
      }
    </div> 
  );
}

export default App;
