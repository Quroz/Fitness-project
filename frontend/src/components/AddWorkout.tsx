import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Audio } from 'react-loader-spinner' 

type Props = {
  setAddWorkout: (addWorkout: boolean) => void;
  data: any;
  id: any;
  loading: any;
};

const AddWorkout = ({ setAddWorkout, data, id, loading }: Props) => {



  const bodyParts = Array.from(new Set(data.map((item: any) => item.bodyPart)));
  const workoutName = Array.from(new Set(data.map((item: any) => item.name)));
  const target = Array.from(new Set(data.map((item: any) => item.target)));
  const equipment = Array.from(new Set(data.map((item: any) => item.equipment)));

 
  const [selectedWorkoutName, setSelectedWorkoutName] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [numberOfSets, setNumberOfSets] = useState(0);
  const [numberOfReps, setNumberOfReps] = useState(0);
  const [currentID, setCurrentId] = useState(0);

  console.log(selectedEquipment)


  const userJSON = localStorage.getItem("userFittness");
  const userParsed = userJSON ? JSON.parse(userJSON) : null;
  const user = userParsed.token
  


  async function addWorkoutHandler(){


    const response = await fetch("http://localhost:4000/api/workout/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user}`
      },
      body: JSON.stringify({
        name: selectedWorkoutName,
        bodyPart: selectedBodyPart,
        muscleTarget: selectedTarget,
        equipment: selectedEquipment,
        sets: numberOfSets,
        reps: numberOfReps,
        plan_id: id,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      alert('Added!');
      window.location.reload()
    } else {
      console.log(data.Error);
      alert('Fail');
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='h-12 bg-lime-300 flex items-center justify-center rounded-t-md relative'>
        <AiOutlineClose className='absolute right-4 text-white text-xl cursor-pointer'
          onClick={() => setAddWorkout(false)}
        />
        <h1 className='text-2xl text-white'>Add Workout</h1>
      </div>
      <div className='flex-1 bg-gray-100 rounded-b-md p-4 flex flex-col gap-4 relative'>
      {loading ? 
          <Audio
          height="80"
          width="80"
          wrapperClass='flex justify-center items-center'
          color="green"
          ariaLabel="loading"
        />
      : 
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4'>
            <label className='text-lg'>Name of the workout</label>
            <select
              id="workoutName"
              name="workoutName"
              value={selectedWorkoutName}
              onChange={(e) => {setSelectedWorkoutName(e.target.value)}}
            >
              <option value="" disabled>Select workout name</option>
              {workoutName?.map((item: any, id: number) => (
                <option key={item} >{item}</option>
              ))}
            </select>
          </div>
          <label className='text-lg'>Bodypart</label>
          <select
            id="bodypart"
            name="bodypart"
            value={selectedBodyPart}
            onChange={(e) => setSelectedBodyPart(e.target.value)}
          >
            <option value={""} disabled>Select bodypart</option>
            {bodyParts?.map((item: any) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <label className='text-lg'>Muscle target</label>
          <select
            id="target"
            name="target"
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
          >
            <option value="" disabled>Select muscle target</option>
            {target?.map((item: any) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <label className='text-lg'>Equipment</label>
          <select
            id="equipment"
            name="equipment"
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
          >
            <option value="" disabled>Select equipment</option>
            {equipment?.map((item: any) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <label className='text-lg'>Amount of sets</label>
          <input
            type="number"
            id="sets"
            name="sets"
            min="1"
            max="100"
            value={numberOfSets}
            onChange={(e) => setNumberOfSets(Number(e.target.value))}
          />
          <label className='text-lg'>Amount of reps</label>
          <input
            type="number"
            id="reps"
            name="reps"
            min="1"
            max="100"
            value={numberOfReps}
            onChange={(e) => setNumberOfReps(Number(e.target.value))}
          />

        </div>
      }
        <button className='px-2 py-2 bg-lime-300 text-white font-bold rounded-md mt-8 text-sm hover:bg-lime-200'
        onClick = {() => addWorkoutHandler()}
        >Add</button>
      
      </div>
            
    </div>
  )
}

export default AddWorkout;
