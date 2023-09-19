import React, {useEffect} from 'react'
import { AiOutlineClose } from "react-icons/ai";


type Props = {
    setAddWorkout: (addWorkout: boolean) => void; 
    data: any;
  };

const AddWorkout = ({ setAddWorkout, data }: Props) => {

  console.log("data", data)

  const bodyParts = Array.from(new Set(data.map((item: any) => item.bodyPart)));
  const workoutName = Array.from(new Set(data.map((item: any) => item.name)));
  const target = Array.from(new Set(data.map((item: any) => item.target)));
  const equipment = Array.from(new Set(data.map((item: any) => item.equipment)));

  return (

    <div className='flex flex-col'>
        <div className='relative flex items-center justify-center h-12 bg-lime-300 rounded-t-md'>
             <AiOutlineClose className='absolute text-xl text-white cursor-pointer right-4'
             onClick={() => setAddWorkout(false)}
             />
            <h1 className='text-2xl text-white'>Add Workout</h1>
        </div>
        <div className='flex flex-col flex-1 gap-4 p-4 bg-gray-100 rounded-b-md'>
             <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                  <label className='text-lg'>Name of the workout</label>
                  <select id="workoutName" name="workoutName">
                   {workoutName?.map((item: any) => (
                    <>
                    <option>{item}</option>
                    </>
                   ))}
                </select>
                </div>
                <label className='text-lg'>Bodypart</label>
                 <select id="bodypart" name="bodypart">
                   {bodyParts?.map((item: any) => (
                    <>
                    <option>{item}</option>
                    </>
                   ))}
                </select>
                <label className='text-lg'>Muscle target</label>
                 <select id="bodypart" name="bodypart">
                   {target?.map((item: any) => (
                    <>
                    <option>{item}</option>
                    </>
                   ))}
                </select>
                <label className='text-lg'>Equipment</label>
                 <select id="bodypart" name="bodypart">
                   {equipment?.map((item: any) => (
                    <>
                    <option>{item}</option>
                    </>
                   ))}
                </select>
                <label className='text-lg'>Amount of sets</label>
                <input type="number" id="sets" name="sets" min="1" max="100" />
                <label className='text-lg'>Amount of reps</label>
                <input type="number" id="sets" name="sets" min="1" max="100" />
            </div>
            <button className='px-2 py-2 mt-8 text-sm font-bold text-white rounded-md bg-lime-300 hover:bg-lime-200'>Add</button>
        </div>
    </div>
  )
}

export default AddWorkout