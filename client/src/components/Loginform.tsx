import {useState} from 'react'
import { Link } from 'react-router-dom'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { getServer } from '../utils/getServer'
import { AxiosError } from 'axios'


interface FormErrors{
    email?: string,
    password?:string;
    serverErr?:string;
}

const Loginform = () => {
    const [myFormData, setmyFormData] = useState({
        email:"",
        password:""
    })
    const [errors ,setErrors] = useState<FormErrors>({})
    const [isLoading, setisLoading] = useState(false)
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setmyFormData((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))

    }
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault();
        setisLoading(true)
        try {
            const {email:subEmail, password:subPassword} = myFormData
            const response = await getServer.post( '/auth/login',{
                email: subEmail,
                password: subPassword
            })
            const data = await response.data
            setisLoading(false)
            console.log(data)
        } catch (error) {
            const errorMsg = error instanceof AxiosError ? error.response?.data.error.message : 'An error occured'
            setErrors((prev)=>({...prev, serverErr: errorMsg}))
            console.log(errorMsg)
            setisLoading(false)
        }

    }

  return (
    <form onSubmit={handleSubmit} className=' w-1/2 mx-auto'>
        <div className=' mb-7'>
            <Label htmlFor='email' className=' block mb-2'>Email</Label>
            <Input name='email' value={myFormData.email} type='email' placeholder='e.g joe@gmail.com' onChange={handleChange} className=' rounded-lg'/>
        </div>
        <div className=' mb-7'>
            <Label htmlFor='password' className=' block mb-2'>Password</Label>
            <Input name='password' value={myFormData.password} type='password' placeholder='your password' onChange={handleChange} className=' rounded-lg'/>
        </div>
        <div className=' text-xs my-5'>
            <span>Do not have an account? </span>
            <Link to={'/register'} className=' underline'>
                Sign up
            </Link>
        </div>
        <span className=' text-red-500 text-2xl my-4'>{errors.serverErr}</span>
        <button 
        type='submit' 
        disabled={isLoading}
        className={` w-full px-7 py-2 rounded-2xl border border-transparent 
        transition-all ease-in-out duration-500 text-white bg-black hover:bg-white
        hover:text-black hover:border-black`}>
            { !isLoading ? "Login" :"logging in..."}
        </button>
    </form>
  )
}

export default Loginform
