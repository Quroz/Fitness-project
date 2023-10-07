import React, { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

function Settings() {
  const [weight, setWeight] = useState<string>('');
  const weightOptions = Array.from({ length: 181 }, (_, index) => 20 + index);

  const [height, setHeight] = useState<string>('');
  const heightOptions = Array.from({ length: 121 }, (_, index) => 100 + index);

  const [age, setAge] = useState<string>('');
  const ageOptions = Array.from({ length: 100 }, (_, index) => index + 1);

  const [goal, setGoal] = useState<string>('');


  const userJSON = localStorage.getItem("userFittness");
  const user = userJSON ? JSON.parse(userJSON) : null;
  console.log("logged setting", user)

  async function updateSettings(){

      const email = user.email
    
      const response = await fetch('http://localhost:4000/api/user/updateSettings/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, weight, height, age, goals: goal})
        })

      const data = await response.json()

      if(response.status !== 200){
         
          console.log(data.Error)
      }
      else{
          localStorage.setItem("userFittness", JSON.stringify(data))
        
          window.location.reload()
      }
  }


  return (
    <div className='w-full min-h-screen bg-lime-300 py-16'>
      <div className='h-full w-[70%] mx-auto flex flex-col gap-4'>
        <h1 className='font-bold text-2xl'>Hi, {user.name}</h1>
        <div className='bg-white p-4 rounded-md'>
            <h2 className='text-xl font-semibold mb-2'>Welcome to Your Settings</h2>
            <p className='text-gray-600'>
              This is your personalized settings page, where you can update and manage your profile information.
              Feel free to make changes to your weight, height, age, and set new goals to track your progress.
            </p>
        </div>
        <div className='bg-white flex flex-col rounded-md'>
          <div className='flex items-center w-full p-8 justify-around'>
            <h1 className='text-2xl'>
              Current weight: <strong>{user.weight} kg</strong>
            </h1>
            <div className='flex items-center gap-4'>
              <select
                id='weightDropdown'
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className = "border-black border-[1px] rounded-md p-1"
              >
                <option value=''>Select Weight (kg)</option>
                {weightOptions.map((weight) => (
                  <option key={weight} value={weight}>
                    {weight} kg
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='flex items-center w-full p-8 justify-around'>
            <h1 className='text-2xl'>
              Current height: <strong>{user.height} cm</strong>
            </h1>
            <div className='flex items-center gap-4'>
              <select
                id='heightDropdown'
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className = "border-black border-[1px] rounded-md p-1"
              >
                <option value=''>Select Height (cm)</option>
                {heightOptions.map((height) => (
                  <option key={height} value={height}>
                    {height} cm
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='flex items-center w-full p-8 justify-around'>
            <h1 className='text-2xl'>
              Current age: <strong>{user.age} years</strong>
            </h1>
            <div className='flex items-center gap-4'>
              <select
                id='ageDropdown'
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className = "border-black border-[1px] rounded-md p-1"
              >
                <option value=''>Select age</option>
                {ageOptions.map((age) => (
                  <option key={age} value={age}>
                    {age} years
                  </option>
                ))}
              </select>
            </div>
          </div>
          <AiFillCheckCircle size = {40} className = "cursor-pointer self-center mb-4" color = "green"/>
        </div>
        <div className='bg-white flex w-full p-8 justify-around rounded-md'>
          <div className='flex flex-col items-center gap-4'>
            <h1 className='text-2xl'>Do you have any new goals today?</h1>
            <button className='bg-lime-300 hover:bg-lime-200 text-black px-2 py-1 rounded-md'>
              View current goals
            </button>
          </div>
          <div className='flex flex-col gap-2'>
            <textarea
              id='w3review'
              name='w3review'
              rows={4}
              cols={50}
              className='border-black border-[1px] rounded-md p-1'
              placeholder='Write any goal..'
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <button className='bg-lime-300 hover:bg-lime-200 text-black px-2 py-1 rounded-md'>
              Add goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
