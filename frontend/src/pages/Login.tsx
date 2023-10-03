import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {useAccount} from "../hooks/useAccount"

export interface IAppProps {
    login: Function,
    loginError: String,
    signup: Function,
    signupError: String,
    logout: Function,
}

export default function Login (props: IAppProps) {

  const navigate = useNavigate();


  const {login, loginError ,signup ,signupError ,logout} = useAccount({})

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function clickHandler(){
    await login(email,password)
    
  }

  return (
    <div className='w-full h-screen'>
        <div className='flex w-full h-full'>
            <div className='w-[40%] bg-black h-full flex flex-col px-4 py-16'>
                <h1 className='text-4xl font-bold text-white'>Login</h1>
                <div className='flex gap-2 mt-2'>
                    <p className='text-gray-100 text-md'>Don't have an account yet?</p>
                    <Link to = "/signup"><p className='font-bold text-gray-100 underline hover:text-green-200'>Sign up</p></Link>
                </div>
                <div className='flex flex-col w-full gap-1 mt-10'>
                    <label className='text-xl text-white'>Email Address</label>
                    <input className='border-[1px] border-black indent-1 rounded-md py-4' type='email'
                        value = {email} onChange = {(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 mt-5'>
                    <label className='text-xl text-white'>Password</label>
                    <input className='border-[1px] border-black indent-1 rounded-md py-4' type='password'
                      value = {password} onChange = {(e) => setPassword(e.target.value)}
                    />
                </div>

                {loginError && <p className='text-red-500 mt-1 text-md'>{loginError}</p>}
                <button className='text-center p-4 bg-green-400 mt-12 rounded-md hover:bg-green-300 text-white text-xl'
                onClick = {clickHandler}
                >LOGIN</button>
            </div>
            <div className='w-full h-full flex-1'>
                <img className='w-full h-full object-cover' src = "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2022/11/Strength-training-programs.jpg?fit=1988%2C1327&ssl=1"/>
            </div>
        </div>
    </div>
  );
}
