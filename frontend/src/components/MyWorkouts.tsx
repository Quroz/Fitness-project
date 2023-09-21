import React, {useEffect, useState} from 'react'
import AddWorkout from "./AddWorkout"
import AddPlan from "./AddPlan"
import { useNavigate } from "react-router-dom";


type Props = {}

const MyWorkouts = (props: Props) => {

  const [addWorkout, setAddWorkout] = useState(false)
  const [addPlan, setAddPlan] = useState(false)
 

  const [myPlan, setMyPlan] = useState([])
  const navigate = useNavigate();

  console.log("myPlan", myPlan)



  function itemPage(item: any){
    console.log("click")
    const idOnly = { id: item.id };
    
    const queryParam = encodeURIComponent(JSON.stringify(idOnly));

    navigate(`/itemPage?data=${queryParam}`);
  }

  useEffect(() => {
    const localStorageData = localStorage.getItem('myPlan');

   
    if (localStorageData) {
      
      const parsedData = JSON.parse(localStorageData);

      setMyPlan(parsedData);
    } 
  }, [myPlan])

  return (
    <div className='mt-24 w-[80%] mx-auto'>
                <div className='flex items-center justify-between'>
                   <h1>2 Workouts</h1>
                   <h1>Sort by Workout Name: A-Z</h1>
                   <div className='flex items-center gap-2'>
                    <input className='bg-white border-[1px] border-gray-300 indent-1 rounded-sm py-2 w-[250px] text-gray-500' placeholder='Search'/>
                    <button className='bg-lime-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200' onClick={() => setAddPlan(true)} >Add</button>
                   </div>
                </div>
                <div className='my-8 overflow-y-auto flex flex-col gap-4 w-full'>
                             {myPlan.map((item: any) => (
                                  <div className='flex items-center justify-around max-w-full py-4 bg-white border-[1px] border-gray-300 rounded-md cursor-pointer hover:scale-105 duration-300 ease-in'
                                  onClick = {() => itemPage(item)}
                                  >
                                    <h1 className='font-[700]'>Day: {item.day}</h1>
                                    <h1 className='font-[700]'>Name: {item.name}</h1>
                                    <h1 className='font-[700]'>Type: {item.type}</h1>
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