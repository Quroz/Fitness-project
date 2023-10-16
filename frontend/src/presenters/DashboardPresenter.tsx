import { useEffect, useState } from 'react';
import CompWorkouts from "../interfaces/CompWorkouts";
import Dashboard from "../pages/Dashboard";


function DashboardPresenter() {

  const [workouts, setWorkouts] = useState([])
  const [favWorkout, setFavWorkout] = useState("");
  const [barData, setBarData] = useState<{ name: string; value: number; }[]>([]);
  const userJSON = localStorage.getItem("userFittness");
  const userParsed = userJSON ? JSON.parse(userJSON) : null;
  const user = userParsed.token;

  useEffect(() => {
    async function fetchCompletedWorkouts() {
		const response = await fetch("http://localhost:4000/api/workout/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user}`,
			},
		});
		const data = await response.json();

		console.log("data log all workouts", data);
		let filteredData: any = [];
		for (let i = 0; i < data.length; i++) {
			data[i].completedWorkouts.forEach((workout: any) => {
				filteredData.push({
					name: data[i].workoutName,
					workout: workout,
				});
			});
		}
		
		setWorkouts(filteredData);
    favouriteWorkout(filteredData);
	}
    fetchCompletedWorkouts()
  })
  function favouriteWorkout(workouts:CompWorkouts[]){
    let mostCommon: { name: string, value: number }[] = [
  ];

  for (let i = 0; i < workouts.length; i++) {
      let found = false;
      for (let j = 0; j < mostCommon.length; j++) {
          if (mostCommon[j].name === workouts[i].name) {
              mostCommon[j].value++;
              found = true;
              break;
          }
      }
      if (!found) {
          mostCommon.push({ name: workouts[i].name, value: 1 });
      }
  }

  let maxWorkout = mostCommon[0];

  for (let i = 1; i < mostCommon.length; i++) {
      if (mostCommon[i].value > maxWorkout.value) {
          maxWorkout = mostCommon[i];
      }
  }

    setFavWorkout(maxWorkout.name);
    setBarData(mostCommon);

  }


  return (
    <div className='w-full h-screen'>
        <Dashboard barData={barData} favWorkout = {favWorkout} workouts = {workouts}/>
    </div>
  )
}

export default DashboardPresenter