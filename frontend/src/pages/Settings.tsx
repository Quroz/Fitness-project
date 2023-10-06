import React, { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

function Settings() {
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const weightOptions = Array.from({ length: 181 }, (_, index) => 20 + index);

  const [selectedHeight, setSelectedHeight] = useState<string>('');
  const heightOptions = Array.from({ length: 121 }, (_, index) => 100 + index);

  const [selectedAge, setSelectedAge] = useState<string>('');
  const ageOptions = Array.from({ length: 100 }, (_, index) => index + 1);

  const [goal, setGoal] = useState<string>('');

  const handleWeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeight(event.target.value);
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHeight(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAge(event.target.value);
  };

  const handleGoalChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGoal(event.target.value);
  };

  return (
    <div className='w-full min-h-screen bg-lime-300 py-16'>
      <div className='h-full w-[70%] mx-auto flex flex-col gap-4'>
        <h1 className='font-bold text-2xl'>Hi, Filip</h1>
        <div className='bg-white p-4 rounded-md'>
            <h2 className='text-xl font-semibold mb-2'>Welcome to Your Settings</h2>
            <p className='text-gray-600'>
              This is your personalized settings page, where you can update and manage your profile information.
              Feel free to make changes to your weight, height, age, and set new goals to track your progress.
            </p>
        </div>
        <div className='bg-white flex flex-col rounded-md'>
        <div className='flex items-center w-full p-8 justify-around rounded-md'>
          <h1 className='text-2xl'>
            Current weight: <strong>84 kg</strong>
          </h1>
          <div className='flex items-center gap-4'>
            <select
              id='weightDropdown'
              value={selectedWeight}
              onChange={handleWeightChange}
              className = "border-black border-[1px] rounded-md p-1"
            >
              <option value=''>Select Weight (kg)</option>
              {weightOptions.map((weight) => (
                <option key={weight} value={weight}>
                  {weight} kg
                </option>
              ))}
            </select>
            <AiFillCheckCircle color='green' size={24} className='cursor-pointer' />
          </div>
        </div>
        <div className='flex items-center w-full p-8 justify-around rounded-md'>
          <h1 className='text-2xl'>
            Current height: <strong>184 cm</strong>
          </h1>
          <div className='flex items-center gap-4'>
            <select
              id='heightDropdown'
              value={selectedHeight}
              onChange={handleHeightChange}
              className = "border-black border-[1px] rounded-md p-1"
            >
              <option value=''>Select Height (cm)</option>
              {heightOptions.map((height) => (
                <option key={height} value={height}>
                  {height} cm
                </option>
              ))}
            </select>
            <AiFillCheckCircle color='green' size={24} className='cursor-pointer' />
          </div>
        </div>
        <div className='flex items-center w-full p-8 justify-around rounded-md'>
          <h1 className='text-2xl'>
            Current age: <strong>27 years</strong>
          </h1>
          <div className='flex items-center gap-4'>
            <select
              id='ageDropdown'
              value={selectedAge}
              onChange={handleAgeChange}
              className = "border-black border-[1px] rounded-md p-1"
            >
              <option value=''>Select age</option>
              {ageOptions.map((age) => (
                <option key={age} value={age}>
                  {age} years
                </option>
              ))}
            </select>
            <AiFillCheckCircle color='green' size={24} className='cursor-pointer' />
          </div>
        </div>
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
              onChange={handleGoalChange}
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
