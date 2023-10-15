import React, {useState, useEffect} from 'react'
import LogAllWorkouts from "./logAllWorkouts"

type Props = {}

function LogAllWorkoutPresenter({}: Props) {


  const [completedWorkouts, setCompletedWorkouts] = useState<any[]>([])
  const userJSON = localStorage.getItem("userFittness");
  const userParsed = userJSON ? JSON.parse(userJSON) : null;
  const user = userParsed.token;

  useEffect(() => {
    async function fetchWorkouts() {
		
		const response = await fetch("http://localhost:4000/api/workout/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user}`,
			}
		});
		const data = await response.json();

        console.log("data log all workouts", data)
        let filteredData:any = [];
        for(let i = 0; i<data.length; i++){
        data[i].completedWorkouts.forEach((workout:any) => {
            filteredData.push({
            name: data[i].workoutName,
            workout: workout
            })
        });
        }
        console.log("filtered data", filteredData)
		setCompletedWorkouts(filteredData);
   

	}
    fetchWorkouts()
  }, [])

 

  return (
    <div>
        <LogAllWorkouts completedWorkouts={completedWorkouts}/>
    </div>
  )
}

export default LogAllWorkoutPresenter