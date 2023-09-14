import React from 'react'

type Props = {}

export default function WorkoutPlan({}: Props) {
  return (
    <div className='w-full h-screen relative px-24 flex justify-center items-center'>
         <img src = "https://www.nojcc.org/clientuploads/Virtual%20Resources/Zoom%20Backgrounds/ZOOM_Uptown_Training_Room.jpg" className='w-full h-full object-cover absolute'/>
         <div className='h-[90%] w-[50%] bg-green-500 absolute z-10'>
            <div className='w-full bg-blue-500 h-[85%] overflow-y-scroll'>
                <h1>TJA OLLEMAN</h1>
                <h1>TJA OLLEMAN</h1>
            </div>
            <div className='w-full p-12 flex items-center justify-around'>
                <button className= 'w-10 h-10 bg-orange-200 text-xl hover:bg-orange-100 rounded-md' onClick={() => {alert('clicked'); }}>+</button>
                <button className= 'w-40 h-10 bg-orange-200 hover:bg-orange-100 rounded-md' onClick={() => {alert('clicked'); }}>Add day</button>
            </div>
         </div>
    </div>
  )
}