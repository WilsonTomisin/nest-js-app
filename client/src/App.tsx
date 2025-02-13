import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Homepage, Login, Signup, MyNotes } from './pages'

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Homepage/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Signup/>
    },
    {
      path:"/notes",
      element:<MyNotes/>
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
