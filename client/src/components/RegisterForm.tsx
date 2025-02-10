import { Link } from 'react-router-dom';
import { Label } from './ui/label';
import { Input } from './ui/input';

const RegisterForm = () => {
  return (
    <form action="" className=' w-1/2 mx-auto'>
        <div className=' mb-7'>
            <Label htmlFor='fullName' className=' block mb-2'>Full name</Label>
            <Input name='fullName' type='text' placeholder='e.g joe smith' className=' rounded-lg'/>
        </div>
        <div className=' mb-7'>
            <Label htmlFor='email' className=' block mb-2'>Email</Label>
            <Input name='email' type='email' placeholder='e.g joe@gmail.com' className=' rounded-lg'/>
        </div>
        <div className=' mb-7'>
            <Label htmlFor='password' className=' block mb-2'>Password</Label>
            <Input name='password' type='password' placeholder='your password' className=' rounded-lg'/>
        </div>
        <div className=' mb-7'>
            <Label htmlFor='comfirmPassword' className=' block mb-2'>Confirm Password</Label>
            <Input name='confirmPassword' type='password' placeholder='confirm your password' className=' rounded-lg'/>
        </div>

        <div className=' text-xs my-5'>
            <span>Already have an account? </span>
            <Link to={'/login'} className=' underline'>
                login here
            </Link>
        </div>
        <button 
        type='submit' 
        className=' w-full px-7 py-2 rounded-2xl border border-transparent transition-all ease-in-out duration-500 text-white bg-black hover:bg-white hover:text-black hover:border-black'>
            Signup
        </button>
    </form>
  )
}

export default RegisterForm
