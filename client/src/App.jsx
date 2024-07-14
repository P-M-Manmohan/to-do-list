import React from 'react'
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Todo from './pages/Todo'
import Auth from './pages/Auth'

const App = () => {




    const router=createBrowserRouter(
        createRoutesFromElements(

            <>
                <Route path='/' element={<Home/>}/>
                <Route path='/list/:id' element={ <Todo /> }/>
            </>    
        )
    )
    return <RouterProvider router={router} />
}

export default App