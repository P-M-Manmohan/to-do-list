import Auth from "./Auth.jsx";
import  { useEffect, useState } from "react";
import  { useCookies } from "react-cookie";
import Lists from "../components/Lists.jsx";
import ListContainer from "../components/ListContainer.jsx";
import Todo  from "./Todo.jsx"
import { Link } from 'react-router-dom'

const Home = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;
    const authToken = cookies.AuthToken;
    const [tasks, setTasks] = useState(null);
    const [list, setList] = useState(null);
    
    const getLists = async () => {
        try {
            const result = await fetch(
                `${process.env.REACT_APP_SERVERURL}/lists/${userEmail}`
            );
            const json = await result.json();
            setList(json);
            console.log(list)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (authToken) {
            getLists();
        }
    }, []);

    const sortedLists = list?.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    return (
        <div className="app">
            {!authToken && <Auth />}

            {authToken && (
                <>
                <Lists getLists={getLists}/>
                <p className="username">Welcome back {userEmail}</p>
                    {sortedLists?.map((list) => (
                        <Link 
                            to={`/list/${list.id}`}
                        >
                        <ListContainer key={list.id} lists={list} getLists={getLists} />
                        </Link>
                    ))}

                    <p className="copyright">© Project 2</p>
                </>
            )}
        </div>
    );
};

export default Home;
