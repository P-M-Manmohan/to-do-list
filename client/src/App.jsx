import { useEffect, useState } from "react"
import ListHeader from "./components/ListHeader"
import ListItem from "./components/ListItem"

const App=()=> {
  const userEmail="myemaill@gmail.com"
  const [tasks,setTasks]=useState(null)

  const getData= async ()=>{
    try{
        const result = await fetch(`http://localhost:4000/todos/${userEmail}`)
        const json=await result.json();
        setTasks(json)
        
        }catch(err){
          console.log(err)
        }
    } 
          
    useEffect(()=> getData ,[])
    
  console.log(tasks)

  const sortedTasks =tasks?.sort((a,b)=> new Date(a.date)-new Date(b.date))
  return (
    <div className="app">
      <ListHeader  ListName={'Holiday'}/>
      { sortedTasks?.map((task)=><ListItem key={task.id} task={task}/>) }
    </div> 
  );
}

export default App;
