import { useEffect, useState, useContext } from "react";
import CompWorkouts from "../interfaces/CompWorkouts";
import DashboardView from "../pages/Dashboard/Dashboard"
import AppContext from "../context/app/AppContext";

interface Context {
  setData: () => void;
  workoutData: any;
  setUser: () => void;
}
function DashboardPresenter() {
  const [workouts, setWorkouts] = useState([]);
  const [favWorkout, setFavWorkout] = useState("");
  const [barData, setBarData] = useState<{ name: string; value: number; }[]>([]);
  const userJSON = localStorage.getItem("userFittness");
  const userParsed = userJSON ? JSON.parse(userJSON) : null;
  const user = userParsed.token;

  const [isAnimating, setIsAnimating] = useState(false);
  const innerWidth = window.innerWidth;


  useEffect(() => {
    // Trigger the animation after a delay or some event.
    setTimeout(() => {
      setIsAnimating(true);
    }, 500); // Delay of 1 second
  }, []);

  useEffect(() => {
    async function fetchCompletedWorkouts() {
      const response = await fetch("https://fitnessproject.onrender.com/api/workout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      });
      const data = await response.json();

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
    fetchCompletedWorkouts();
  }, []);

  function favouriteWorkout(workouts: CompWorkouts[]) {
    if (workouts.length) {
      let mostCommon: { name: string; value: number }[] = [];

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

      setFavWorkout("Your favourite workout is  " + maxWorkout.name);
      setBarData(mostCommon);
    } else {
      setFavWorkout("You have not performed a workout Yet");
    }
  }



  return <DashboardView workouts={workouts} favWorkout={favWorkout} barData={barData} isAnimating = {isAnimating} innerWidth = {innerWidth}/>;
}

export default DashboardPresenter;
