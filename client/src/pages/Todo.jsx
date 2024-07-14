import { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ListHeader from '../components/ListHeader.jsx'
import ListItem  from '../components/ListItem.jsx'
import { useParams } from 'react-router-dom';
import Auth from './Auth.jsx'

const Todo = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;
    const authToken = cookies.AuthToken;
    const [tasks, setTasks] = useState(null);
    const { id}=useParams();

    
    const getData = async () => {
        try {
            const result = await fetch(
                `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}/${id}`
            );
            const json = await result.json();
            setTasks(json);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (authToken) {
            getData();
        }
    }, []);
    
    const sortedTasks = tasks?.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
    

  return (
<div className='app'>

    {!authToken && <Auth />}

    {authToken && (
        <>
    <ListHeader listId={id} getData={getData} />

    {
    sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} listId={id} getData={getData} />
    ))
    }
    </>
)}
</div>
)

}


export default Todo