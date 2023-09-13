import React, {useState} from "react"
import {Link} from "react-router-dom"
import {useAccount} from "../hooks/useAccount"

export interface IAppProps {
    login: Function,
    loginError: String,
    signup: Function,
    signupError: String,
    logout: Function,
}

export default function Login (props: IAppProps) {


const {login, loginError ,signup ,signupError ,logout} = useAccount({})

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function clickHandler(){
    await login(email,password)
  }

  return (
    <div className='w-full h-screen'>
        <div className='w-full m-auto my-20 flex h-full'>
            <form className='w-[40%] bg-black h-full flex flex-col px-4 py-16'>
                <h1 className='text-4xl font-bold text-white'>Login</h1>
                <div className='flex gap-2 mt-2'>
                    <p className='text-md text-gray-100'>Don't have an account yet?</p>
                    <Link to = "/signup"><p className='font-bold underline hover:text-green-200 text-gray-100'>Sign up</p></Link>
                </div>
                <div className='flex flex-col w-full mt-10 gap-1'>
                    <label className='text-xl text-white'>Email Address</label>
                    <input className='border-[1px] border-black indent-1 rounded-md py-4' type='email' />
                </div>
                <div className='flex flex-col gap-1 mt-5'>
                    <label className='text-xl text-white'>Password</label>
                    <input className='border-[1px] border-black indent-1 rounded-md py-4' type='password' />
                </div>
                <button className='text-center p-4 bg-green-400 mt-12 rounded-md hover:bg-green-300 text-white text-xl'>LOGIN</button>
            </form>
            <div className='w-full h-full flex-1 bg-red-500'>
                <img className='w-full h-full object-cover' src = "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2022/11/Strength-training-programs.jpg?fit=1988%2C1327&ssl=1"/>
            </div>
        </div>
    </div>
  );
}
