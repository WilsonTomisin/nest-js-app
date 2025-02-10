import React from 'react'
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import authimage from '../assets/undraw_start-building_7gui.png';
import { Link } from 'react-router-dom';
import Loginform from '../components/Loginform';

const Login = () => {
  return (
    <div className=' flex items-center  h-full'>

        <div className=' w-[40%] h-screen flex items-center' >
            <img src={authimage} alt="hotel image" className=' my-auto ' />
        </div>
      <div className=' w-[60%] h-full'>
            <h2 className=' text-3xl text-center font-semibold'>Login</h2>
            <Loginform/>
      </div>
    </div>
  )
}

export default Login
