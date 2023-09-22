import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import AddWorkout from "./AddWorkout"
import { AiFillWindows, AiOutlineClose } from "react-icons/ai";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

type Props = {
    item: any;
    setAddWorkout: any;
}



function ItemPage({}: Props) {

    const [data, setData] = useState([])
    const [workouts, setWorkouts] = useState([[]])
    const [loading, setLoading] = useState(false)

    const userJSON = localStorage.getItem("userFittness");
    const user = userJSON ? JSON.parse(userJSON) : null;
    const navigate = useNavigate();

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
      setWorkouts(data)
      console.log("test brä", data);
    }
   fetchWorkouts()
  }, [])

    async function addWorkoutHandler(){
        setAddWorkout(true)
        setLoading(true)
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
                setLoading(false)
              } catch (error) {
                console.error(error);
              }
    
      } 

      async function deleteWorkoutHandler(name: any){
        const response = await fetch("http://localhost:4000/api/workout/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
          },
          body: JSON.stringify({
            name: name,
            plan_id: dataJSON.id
          }),
        });
        
        if(response.status !== 200){
          alert("Could not delete workout")
        }
        else{
          window.location.reload()
        }
      } 

    const [addWorkout, setAddWorkout] = useState(false)
    


    
    console.log("DATA i test", dataJSON)

  return (
    <div className='w-full h-screen relative'>
             <img src = "https://assets.website-files.com/63765b8cfd2906b4a1713e44/63a204259f38bb4fbd9699a4_CROSSFIT%20GYM%20IN%20LAKE%20FOREST.jpg" className='sticky object-cover w-full h-full'/>
             <BsFillArrowLeftCircleFill className='z-20 absolute left-2 top-2 cursor-pointer' size = {24} color = "white"
             onClick = {() => navigate(`/test`)}
             />
            <div className='top-0 left-0 absolute z-10 w-full h-full bg-black/40 p-8 flex-col gap-4 flex items-center pt-48'>
                 <h1 className='text-white text-7xl font-bold'>My workout plan</h1>
                 <h1 className='text-white text-xl'>Your one-stop destination for creating, tracking, and achieving your fitness goals.</h1>
                 <div className='flex items-center mt-8 gap-48 w-full justify-center'>
                     <button className='px-4 py-4 w-[250px] bg-lime-300 text-white font-bold rounded-md hover:bg-lime-200'
                     onClick={() => addWorkoutHandler()}
                     >Add workout</button>
                 </div>
                        <div className='overflow-y-auto flex flex-col gap-8 pt-4 w-full bg-black/10 rounded-md'>
                          {workouts.map((workout: any) => (
                                <div className='flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 relative'>
                                  <AiOutlineClose className='top-2 right-2 absolute' onClick = {
                                    () => deleteWorkoutHandler(workout.name)
                                  }/>
                                  <h1 className='font-[700]'>{workout.name}</h1>
                                  <h1 className='font-[700]'>{workout.bodyPart}</h1>
                                  <h1 className='font-[700]'>{workout.muscleTarget}</h1>
                                  <h1 className='font-[700]'>{workout.equipment}</h1>
                                  <h1 className='font-[700]'>{workout.sets}</h1>
                                  <h1 className='font-[700]'>{workout.reps}</h1>
                                </div>
                          ))}
                            
                    </div> 
            </div>
             {addWorkout && 
                      <div className={addWorkout ? 'bottom-0 left-0 right-0 top-[5%] m-auto absolute z-20 w-[400px] duration-500 ease-in' : 'left-0 top-[-100%] absolute z-20 h-[400px] w-[400px]'}>
                          <AddWorkout setAddWorkout={setAddWorkout} data={data} id = {dataJSON.id} loading = {loading}/>
                      </div>
             }
    </div>
  );
}

export default ItemPage;
