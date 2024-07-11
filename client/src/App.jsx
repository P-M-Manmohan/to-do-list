// import { useEffect, useState } from "react"
// import ListHeader from "./components/ListHeader"
// import ListItem from "./components/ListItem"
// import Auth from "./components/Auth"
// import { useCookies } from 'react-cookie'

import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import  { useEffect, useState } from "react";
import  { useCookies } from "react-cookie";
import Lists from "./components/Lists.jsx";

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;
    const authToken = cookies.AuthToken;
    const [tasks, setTasks] = useState(null);
    const [list, setList] = useState(null);

    const getData = async () => {
        try {
            const result = await fetch(
                `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
            );
            const json = await result.json();
            setTasks(json);
        } catch (err) {
            console.log(err);
        }
    };

    //get lists
    const getLists = async () => {
        try {
            const result = await fetch(
                `${process.env.REACT_APP_SERVERURL}/lists/${userEmail}`
            );
            const json = await result.json();
            setList(json);
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
        <div className="app">
            {!authToken && <Auth />}

            {authToken && (
                <>
                <Lists getData={getData} getLists={getLists}/>
                <p className="username">Welcome back {userEmail}</p>
                    
                    <ListHeader ListName={"Holiday"} getData={getData} />
                    {sortedTasks?.map((task) => (
                        <ListItem key={task.id} task={task} getData={getData} />
                    ))}

                    <p className="copyright">© Project 2</p>
                </>
            )}
        </div>
    );
};

export default App;
