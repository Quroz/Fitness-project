import React, {useState} from 'react'
import AddWorkout from "./AddWorkout"

type Props = {}

const MyWorkouts = (props: Props) => {

  const [addWorkout, setAddWorkout] = useState(false)

  return (
    <div className='mt-24 w-[80%] mx-auto'>
                <div className='flex items-center justify-between'>
                   <h1>2 Workouts</h1>
                   <h1>Sort by Workout Name: A-Z</h1>
                   <div className='flex items-center gap-2'>
                    <input className='bg-white border-[1px] border-gray-300 indent-1 rounded-sm py-2 w-[250px] text-gray-500' placeholder='Search'/>
                    <button className='bg-lime-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200'
                    onClick = {() => setAddWorkout(true)}
                    >Add</button>
                   </div>
                </div>
                <div className='my-8 overflow-y-auto flex flex-col gap-4 w-full'>
                            <div className='flex items-center justify-around max-w-full py-4 bg-white border-[1px] border-gray-300 rounded-md cursor-pointer hover:scale-105 duration-300 ease-in'>
                                <h1 className='font-[700]'>Dag 1</h1>
                                <h1 className='font-[700]'>Lower Body</h1>
                                <h1 className='font-[700]'>5 workouts</h1>
                            </div>
                            <div className='flex items-center justify-around max-w-full py-4 bg-white border-[1px] border-gray-300 rounded-md cursor-pointer hover:scale-105 duration-300 ease-in'>
                                <h1 className='font-[700]'>Dag 1</h1>
                                <h1 className='font-[700]'>Lower Body</h1>
                                <h1 className='font-[700]'>5 workouts</h1>
                            </div>
                            <div className='flex items-center justify-around max-w-full py-4 bg-white border-[1px] border-gray-300 rounded-md cursor-pointer hover:scale-105  duration-300 ease-in'>
                                <h1 className='font-[700]'>Dag 1</h1>
                                <h1 className='font-[700]'>Lower Body</h1>
                                <h1 className='font-[700]'>5 workouts</h1>
                            </div>
                            <div className='flex items-center justify-around max-w-full py-4 bg-white border-[1px] border-gray-300 rounded-md cursor-pointer hover:scale-105  duration-300 ease-in'>
                                <h1 className='font-[700]'>Dag 1</h1>
                                <h1 className='font-[700]'>Lower Body</h1>
                                <h1 className='font-[700]'>5 workouts</h1>
                            </div>
                            <div className='flex items-center justify-around max-w-full py-4 bg-white border-[1px] border-gray-300 rounded-md cursor-pointer hover:scale-105  duration-300 ease-in'>
                                <h1 className='font-[700]'>Dag 1</h1>
                                <h1 className='font-[700]'>Lower Body</h1>
                                <h1 className='font-[700]'>5 workouts</h1>
                            </div>
                            <div className='flex items-center justify-around max-w-full py-4 bg-white border-[1px] border-gray-300 rounded-md cursor-pointer hover:scale-105  duration-300 ease-in'>
                                <h1 className='font-[700]'>Dag 1</h1>
                                <h1 className='font-[700]'>Lower Body</h1>
                                <h1 className='font-[700]'>5 workouts</h1>
                            </div>
                            <div className='flex items-center justify-around max-w-full py-4 bg-white border-[1px] border-gray-300 rounded-md cursor-pointer hover:scale-105  duration-300 ease-in'>
                                <h1 className='font-[700]'>Dag 1</h1>
                                <h1 className='font-[700]'>Lower Body</h1>
                                <h1 className='font-[700]'>5 workouts</h1>
                            </div>
                            <div className='flex items-center justify-around max-w-full py-4 bg-white border-[1px] border-gray-300 rounded-md cursor-pointer hover:scale-105  duration-300 ease-in'>
                                <h1 className='font-[700]'>Dag 1</h1>
                                <h1 className='font-[700]'>Lower Body</h1>
                                <h1 className='font-[700]'>5 workouts</h1>
                            </div>
                            <div className='flex items-center justify-around max-w-full py-4 bg-white border-[1px] border-gray-300 rounded-md cursor-pointer hover:scale-105  duration-300 ease-in'>
                                <h1 className='font-[700]'>Dag 1</h1>
                                <h1 className='font-[700]'>Lower Body</h1>
                                <h1 className='font-[700]'>5 workouts</h1>
                            </div>
                    </div>
                    
                    <div className={addWorkout ? 'bottom-0 left-0 right-0 top-[30%] m-auto absolute z-20 w-[400px] duration-500 ease-in' : 'left-0 top-[-100%] absolute z-20 h-[400px] w-[400px]'}>
                        <AddWorkout setAddWorkout={setAddWorkout}/>
                    </div>
           </div>
  )
}

export default MyWorkouts