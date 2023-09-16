import React from 'react'

type Props = {}

export default function Workout({}: Props) {
  return (
    <div className='relative flex items-center justify-center w-full h-screen px-24'>
         <img src = "https://www.nojcc.org/clientuploads/Virtual%20Resources/Zoom%20Backgrounds/ZOOM_Uptown_Training_Room.jpg" className='absolute object-cover w-full h-full'/>
         <div className='h-[90%] w-[50%] absolute z-10 flex flex-col'>
            <h1 className='text-4xl text-center text-white'>My workouts</h1>
            <div className='w-full h-[85%] overflow-y-auto flex flex-col gap-8 pt-8'>
                <div className='flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 opacity-80'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
                <div className='flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 opacity-80'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
                <div className='flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 opacity-80'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
                <div className='flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 opacity-80'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
                <div className='flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 opacity-80'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
                <div className='flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 opacity-80'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
                <div className='flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 opacity-80'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
                <div className='flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 opacity-80'>
                    <h1 className='font-[700]'>Dag 1</h1>
                    <h1 className='font-[700]'>Lower Body</h1>
                    <h1 className='font-[700]'>5 workouts</h1>
                </div>
            </div>
            <div className='flex items-center justify-around flex-1 w-full justify'>
                <button className= 'w-10 h-10 text-xl bg-gray-200 rounded-md hover:bg-orange-100 opacity-80' onClick={() => {alert('clicked'); }}>+</button>
                <button className= 'w-40 h-10 bg-gray-200 rounded-md hover:bg-orange-100 opacity-80' onClick={() => {alert('clicked'); }}>Add day</button>
            </div>
         </div>
    </div>
  )
}