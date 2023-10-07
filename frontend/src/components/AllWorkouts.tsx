import React, { useState, useEffect } from 'react';

interface Exercise {
  bodyPart: any; 
}

const AllWorkouts = () => {
  const [data, setData] = useState<Exercise[]>([]); 

  useEffect(() => {
    async function addWorkoutHandler() {
      const url = 'https://exercisedb.p.rapidapi.com/exercises';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '15157ef7b5msh145eaabd9036395p16c555jsn7dde4f641913',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result: Exercise[] = await response.json(); 
        console.log(result);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }
    addWorkoutHandler();
  }, []);

  return (
    <div className='mt-24 w-[80%] mx-auto'>
      <div className='w-full h-full flex items-center justify-between'>
        {data?.slice(0,10).map((item) => (
            <h1>{item.bodyPart}</h1>
        ))}
      </div>
    </div>
  );
};

export default AllWorkouts;
