import React, {useEffect, useState} from 'react'
import AddWorkout from "./AddWorkout"
import AddPlan from "./AddPlan"
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";


type Props = {
  id: number;
  day: string;
  name: string;
  type: string;
}

const MyWorkouts = () => {

  const [addWorkout, setAddWorkout] = useState(false)
  const [addPlan, setAddPlan] = useState(false)
 

  const [myPlan, setMyPlan] = useState<Props[]>([]); 

  const navigate = useNavigate();

  const userJSON = localStorage.getItem("userFittness");
  const user = userJSON ? JSON.parse(userJSON) : null;

 console.log("fas", user)

  function itemPage(item: any){

    const id = { id: item.id };
    
    const queryParam = encodeURIComponent(JSON.stringify(id));

    navigate(`/itemPage?data=${queryParam}`);
  }

 function deleteHandler(id: any) {
  console.log("id delete", id);

  const updatedData = myPlan.filter((item) => item.id !== id);

  setMyPlan(updatedData);
  console.log("updatedData", updatedData);
  localStorage.setItem('myPlan', JSON.stringify(updatedData)); 
}


  useEffect(() => {
    const localStorageData = localStorage.getItem(user.email);

   
    if (localStorageData) {
      
      const parsedData = JSON.parse(localStorageData);

      setMyPlan(parsedData);
    } 
  }, [])

  async function deleteWorkoutPlan(id: number){
    const response = await fetch("http://localhost:4000/api/workout/deleteAllWorkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({
        plan_id: id
      }),
    });
    const data = await response.json();
    if(response.status !== 200){
      alert("Could not delete workoutplan")
    }
    else{
      alert("Deleted!")
     
      const updatedData = myPlan.filter((item) => item.id !== id);

      setMyPlan(updatedData);
      localStorage.setItem('myPlan', JSON.stringify(updatedData)); 
      window.location.reload()
    }
  
  }

  return (
    <div className='mt-24 w-[80%] mx-auto'>
                <div className='flex items-center justify-between'>
                   <h1>{myPlan.length} Workouts</h1>
                   <h1>Sort by Workout Name: A-Z</h1>
                   <div className='flex items-center gap-2'>
                    <input className='bg-white border-[1px] border-gray-300 indent-1 rounded-sm py-2 w-[250px] text-gray-500' placeholder='Search workout by name'/>
                    <button className='bg-lime-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200' onClick={() => setAddPlan(true)} >Add</button>
                   </div>
                </div>
                <div className='my-8 overflow-y-auto flex flex-col gap-4 w-full'>
                             {myPlan.map((item: any) => (
                                  <div className='flex items-center justify-around max-w-full py-4 bg-white border-[1px] border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 relative'>
                                    <h1 className='font-[700]'>Day: {item.day}</h1>
                                    <h1 className='font-[700]'>Name: {item.name}</h1>
                                    <h1 className='font-[700]'>Type: {item.type}</h1>
                                     <AiOutlineArrowRight size = {24} color = "green"
                                     onClick = {() => itemPage(item)}
                                     />
                                     <AiOutlineClose className='cursor-pointer absolute top-1 right-2' color = "red" size = {12} onClick={() => deleteWorkoutPlan(item.id)}/>
                                  </div>
                             ))}
                          
                    </div>
                    
                    {addPlan && 
                         <div className={addPlan ? 'bottom-0 left-0 right-0 top-[30%] m-auto absolute z-20 w-[400px] duration-500 ease-in' : 'left-0 top-[-100%] absolute z-20 h-[400px] w-[400px]'}>
                            <AddPlan setAddPlan={setAddPlan} myPlan = {myPlan}
                            setMyPlan={setMyPlan}
                            />
                         </div>
                    }
           </div>
  )
}

export default MyWorkouts