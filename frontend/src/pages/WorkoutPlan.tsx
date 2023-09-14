import React from 'react'

type Props = {}

export default function WorkoutPlan({}: Props) {
  return (
    <div className='w-full h-screen relative px-24 flex justify-center items-center'>
         <img src = "https://www.nojcc.org/clientuploads/Virtual%20Resources/Zoom%20Backgrounds/ZOOM_Uptown_Training_Room.jpg" className='w-full h-full object-cover absolute'/>
         <div className='h-[90%] w-[50%] absolute z-10 flex flex-col'>
            <h1 className='text-center text-4xl text-white'>My workouts</h1>
            <div className='w-full h-[85%] overflow-y-auto flex flex-col gap-8 pt-8'>
                <div className='flex items-center justify-around rounded-lg bg-gray-200 max-w-full py-4 mx-2 hover:bg-gray-100 cursor-pointer'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
                <div className='flex items-center justify-around rounded-lg bg-gray-200 max-w-full py-4 mx-2 hover:bg-gray-100 cursor-pointer'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
                <div className='flex items-center justify-around rounded-lg bg-gray-200 max-w-full py-4 mx-2 hover:bg-gray-100 cursor-pointer'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
                <div className='flex items-center justify-around rounded-lg bg-gray-200 max-w-full py-4 mx-2 hover:bg-gray-100 cursor-pointer'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
                <div className='flex items-center justify-around rounded-lg bg-gray-200 max-w-full py-4 mx-2 hover:bg-gray-100 cursor-pointer'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
                <div className='flex items-center justify-around rounded-lg bg-gray-200 max-w-full py-4 mx-2 hover:bg-gray-100 cursor-pointer'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
                <div className='flex items-center justify-around rounded-lg bg-gray-200 max-w-full py-4 mx-2 hover:bg-gray-100 cursor-pointer'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
                <div className='flex items-center justify-around rounded-lg bg-gray-200 max-w-full py-4 mx-2 hover:bg-gray-100 cursor-pointer'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
            </div>
            <div className='w-full flex items-center justify-around justify flex-1'>
                <button className= 'w-10 h-10 bg-gray-200 text-xl hover:bg-orange-100 rounded-md' onClick={() => {alert('clicked'); }}>+</button>
                <button className= 'w-40 h-10 bg-gray-200 hover:bg-orange-100 rounded-md' onClick={() => {alert('clicked'); }}>Add day</button>
            </div>
         </div>
    </div>
  )
}