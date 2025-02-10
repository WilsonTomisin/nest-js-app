import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <nav className=' py-5 px-7 flex items-center justify-between border-b-2 border-black'>
        <aside className=' text-xl font-semibold bg-black text-white rounded-3xl py-1 px-4  '>
            iNote
        </aside>

        <div className=' flex items-center gap-4'>
            <button 
            className=' bg-black text-white px-10 py-2 rounded-xl'
            onClick={()=>navigate("/register")}
            >
            Sign up
            </button>
            <button 
            onClick={()=>navigate("/login")}
            className=' border-2 border-black text-black px-10 py-2 rounded-xl'>
                Login
            </button>
        </div>
    </nav>
  )
}

export default Navbar
