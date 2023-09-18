import React from 'react'
import { AiOutlineClose } from "react-icons/ai";


type Props = {
    setAddWorkout: (addWorkout: boolean) => void; 
  };

const AddWorkout = ({ setAddWorkout }: Props) => {


  return (
    
    <div className='flex flex-col'>
        <div className='h-12 bg-lime-300 flex items-center justify-center rounded-t-md relative'>
             <AiOutlineClose className='absolute right-4 text-white text-xl cursor-pointer'
             onClick={() => setAddWorkout(false)}
             />
            <h1 className='text-2xl text-white'>Add Workout</h1>
        </div>
        <div className='flex-1 bg-gray-100 rounded-b-md p-4 flex flex-col gap-4'>
             <div className='flex flex-col gap-4'>
                <label className='text-lg'>Day of the workout</label>
                <input className='indent-1 bg-white w-full py-1' placeholder='Day..'/>
            </div>
            <div className='flex flex-col gap-4'>
                <label className='text-lg'>Name of the workout plan</label>
                <input className='indent-1 bg-white w-full py-1' placeholder='Name..'/>
            </div>
            <button className='px-2 py-2 bg-lime-300 text-white font-bold rounded-md mt-8 text-sm hover:bg-lime-200'>Add</button>
        </div>
    </div>
  )
}

export default AddWorkout