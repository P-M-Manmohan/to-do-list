import { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ListHeader from '../components/ListHeader.jsx'
import ListItem  from '../components/ListItem.jsx'

const Todo = ({ title,getData }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;
    const authToken = cookies.AuthToken;
    const [tasks, setTasks] = useState(null);

    // const getData = async () => {
    //     try {
    //         const result = await fetch(
    //             `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
    //         );
    //         const json = await result.json();
    //         setTasks(json);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    useEffect(() => {
        if (authToken) {
            getData();
        }
    }, []);

    const sortedTasks = tasks?.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );



  return (
    <>
    <ListHeader ListName={ title } getData={getData} />
    {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} getData={getData} />
    ))}
    </>
    )
}


export default Todo