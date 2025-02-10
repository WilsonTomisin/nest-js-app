import React from 'react'
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import authimage from '../assets/undraw_sign-up_qamz.png';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const Signup = () => {
  return (
    <div className=' flex items-center'>

        <div className=' w-[40%] h-screen flex items-center ' >
            <img src={authimage} alt="hotel image" className='' />
        </div>
      <div className=' w-[60%]'>
            <h2 className=' text-3xl text-center font-semibold mb-10'>Create an account</h2>
            <RegisterForm/>
      </div>
    </div>
  )
}

export default Signup
