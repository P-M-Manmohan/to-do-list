import { useEffect, useState } from "react"
import ListHeader from "./components/ListHeader"
import ListItem from "./components/ListItem"
import Auth from "./components/Auth"

const App=()=> {
  const userEmail="myemaill@gmail.com"
  const [tasks,setTasks]=useState(null)
  const authToken=false;

  const getData= async ()=>{
    try{
        const result = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
        const json=await result.json();
        setTasks(json)
        
        }catch(err){
          console.log(err)
        }
    } 
          
    useEffect((authToken)=> 
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
      { sortedTasks?.map((task)=><ListItem key={task.id} task={task} getData={getData}/>) }
      </>
      }
    </div> 
  );
}

export default App;
