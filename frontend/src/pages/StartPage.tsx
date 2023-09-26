import React from 'react'
import {Link} from "react-router-dom"
const logo =  require("../Assets/logo.png");

type Props = {}

function StartPage({}: Props) {
  return (
    <div className='w-full h-screen relative'>
            <div className='h-[70px] bg-black w-full absolute top-0 left-0 z-10 flex items-center justify-between'> 
                <img src = {logo} className = "object-cover w-14 h-14 rounded-full ml-8"/>
                <div className='flex items-center gap-8 mr-8'>
                   <button className='text-black bg-green-400 py-2 px-5 rounded-full text-sm hover:bg-green-200 font-bold'>About</button>
                   <button className='text-black bg-orange-400 py-2 px-5 rounded-full text-sm hover:bg-orange-200 font-bold'>Membership</button>
                </div>
            </div>
            <img src = "https://images.contentstack.io/v3/assets/blt1d89a78b502b83f3/bltaecb379f0961ddc7/61dca18b1f6a6a388b94cda9/Dsktp_Homepage_Hero.jpg?quality=50"
            className='object-container w-full h-full'
            />
            <div className='absolute top-0 left-0 w-full h-full bg-black/50'/>
            <div className='absolute top-[200px] flex flex-col items-center gap-4 bg-black/20 p-16'>
                 <h1 className='text-5xl text-white font-[500]'>Rakin Fitness App</h1>
                 <h1 className='text-4xl text-white font-[500]'>Start your fitness journey today!</h1>
                 <h1 className='text-2xl text-white'>What are you waiting for?</h1>
                 <div className='flex items-center gap-2 mt-4'>
                      <Link to = "/signup"><button className='rounded-md bg-green-400 text-black py-4 px-5 w-[250px] text-xl font-bold hover:bg-green-200'>Sign up now!</button></Link>
                      <Link to = "/login"><button className='rounded-md bg-orange-400 text-black py-4 px-5 w-[250px] text-xl font-bold hover:bg-orange-200'>Login</button></Link>
                 </div>
            </div>
    </div>
  )
}

export default StartPage