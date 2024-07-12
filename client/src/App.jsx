import React from 'react'
import { Route,createBrowserRouter,creaeteRoutesFromElements,RouterProvider } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home.jsx'
import Todo from './pages/Todo.jsx'

const App = () => {
  
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


    const router=createBrowserRouter(
        creaeteRoutesFromElements(
            <Route path='/' element={ <Auth/> }>
                <Route path='/lists' element={ <Home getLists={ getLists } /> }/>
                <Route path='/list/:id' element={ <Todo id={ id } getData={ getData }/> }/>
            </Route>)
    )
    return <RouterProvider router={router} />
}

export default App