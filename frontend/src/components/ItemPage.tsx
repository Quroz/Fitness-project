import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import AddWorkout from "./AddWorkout"

type Props = {
    item: any;
    setAddWorkout: any;
}



function ItemPage({}: Props) {

    const [data, setData] = useState([])

    const userJSON = localStorage.getItem("userFittness");
    const user = userJSON ? JSON.parse(userJSON) : null;

    const location = useLocation();
    const searchData = new URLSearchParams(location.search).get('data');
    const dataJSON = searchData ? JSON.parse(decodeURIComponent(searchData)) : null;

  useEffect(() => {

    async function fetchWorkouts(){
      const response = await fetch("http://localhost:4000/api/workout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          plan_id: dataJSON.id
        }),
      });
      const data = await response.json();
      console.log("test brä", data);
    }
   fetchWorkouts()
  }, [])

    async function addWorkoutHandler(){
        setAddWorkout(true)
        const url = 'https://exercisedb.p.rapidapi.com/exercises';
              const options = {
                method: 'GET',
                headers: {
                  'X-RapidAPI-Key': '083914206emsh11d92ddfb433948p11023ajsnd520bb0564e2',
                  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
              };
    
              try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
                setData(result)
              } catch (error) {
                console.error(error);
              }
    
      } 

    const [addWorkout, setAddWorkout] = useState(false)
    


    
    console.log("DATA i test", dataJSON)

  return (
    <div className='w-full h-screen relative'>
             <div className='absolute w-full h-full flex justify-center items-center'>
                <button onClick = {() => addWorkoutHandler()}>Add</button>
             </div>
             {addWorkout && 
                      <div className={addWorkout ? 'bottom-0 left-0 right-0 top-[30%] m-auto absolute z-20 w-[400px] duration-500 ease-in' : 'left-0 top-[-100%] absolute z-20 h-[400px] w-[400px]'}>
                          <AddWorkout setAddWorkout={setAddWorkout} data={data} id = {dataJSON.id}/>
                      </div>
             }
    </div>
  );
}

export default ItemPage;
