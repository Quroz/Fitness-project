import React from 'react';
import Exercise from '../interfaces/Exercise';
import Workout from '../interfaces/WorkoutInterface';
const Base_URL = "https://exercisedb.p.rapidapi.com/exercises";
const headers = {
	"X-RapidAPI-Key": "8a354e8a27msh1bad040c9cceae5p1e730fjsn03fd27ba67a5",
	"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
};
const userJSON = localStorage.getItem("userFittness");
const user = userJSON ? JSON.parse(userJSON) : null;
export const APIController = (function () {


  async function exercises_call(limit: number): Promise<Exercise[]> {
    try {
      const response = await fetch(`${Base_URL}?limit=${limit}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching exercises:", error);
      return [];
    }
  }
  async function deleteExercise(index: number, workoutId: number) {
		const response = await fetch(
			"https://fitnessproject.onrender.com/api/workout/deleteExerciseFromWorkout",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user}`,
				},
				body: JSON.stringify({
					exercise_id: index,
					plan_id: workoutId,
				}),
			}
		);

		if (response.status !== 200) {
			alert("Could not delete exercise");
		} else {
			alert("Exercise deleted");
		}
	}
  async function updateSettings(email:string, weight:number, height:string, age:number, goal:string) {
		const response = await fetch(
			"https://fitnessproject.onrender.com/api/user/updateSettings",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, weight, height, age, goals: [goal] }),
			}
		);
    const data = await response.json();
		if (response.status !== 200) {
			alert(data.Error);
		} else {
			localStorage.setItem("userFittness", JSON.stringify(data));
      return data;
		}

	}

  async function fetchWorkouts() {
		const response = await fetch(
			"https://fitnessproject.onrender.com/api/workout/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			}
		);
		const data = await response.json();
    return data;
	}
  async function exercise_name(name: string, limit: number): Promise<Exercise[]> {
    try {
      const response = await fetch(
        `${Base_URL}/name/${name.toLowerCase()}?limit=${limit}`,
        {
          method: "GET",
          headers,
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching exercises by name:", error);
      return [];
    }
  }

  async function exercise_id(id_number: number): Promise<Exercise[]> {
    try {
      const response = await fetch(`${Base_URL}/exercise/${id_number}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching exercises by ID:", error);
      return [];
    }
  }
  async function deleteWorkoutPlan(id: number) {
		const response = await fetch(
			"https://fitnessproject.onrender.com/api/workout/deleteAllWorkouts",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					plan_id: id,
				}),
        
			}
      
		);
    if (response.status !== 200) {
			alert("Could not delete workout plan");
		} else {
			alert("Deleted!");

		}
	}
  async function addToDatabase(name:string, day:string) {
		const response = await fetch(
			"https://fitnessproject.onrender.com/api/workout/add",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					workoutName: name,
					workoutDay: day,
					excercises: [""],
					plan_id: Date.now(),
				}),
			}
		);
		const data = await response.json();
		if (response.status === 200) {
			alert("Added new plan!");
		} else {
			console.log(data.Error);
			alert("Fail");
		}
	}
  async function addFinishedWorkout(id:number, workout:Workout[]){
    const response = await fetch(
      "https://fitnessproject.onrender.com/api/workout/addCompletedWorkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({
          plan_id: id,
          workout: workout,
          date: new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear(),
        }),
      }
    );
    const data = await response.json();

    if (response.status !== 200) {
      alert("Something went wrong, please try again");
    } else {
      alert("Workout completed");
    }
  }
  async function addExercise(id: String, selectedWorkoutName:string, selectedBodyPart:string, selectedEquipment:string, numberOfSets:number, numberOfReps:number) {
		const response = await fetch(
			"https://fitnessproject.onrender.com/api/workout/addExerciseToWorkout",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user}`,
				},
				body: JSON.stringify({
					exercises: [
						{
							name: selectedWorkoutName,
							bodyPart: selectedBodyPart,
							equipment: selectedEquipment,
							sets: numberOfSets,
							reps: numberOfReps,
						},
					],
					plan_id: id,
				}),
			}
		);
		const data = await response.json();
		if (response.status === 200) {
			alert("Added!");
      return data;
		} else {
			console.log(data.Error);
			alert("Fail");
		}
	}

  async function exercise_part(bodyPart: string, limit: number): Promise<Exercise[]> {
    const url = `https://${headers["X-RapidAPI-Host"]}/exercises/bodyPart/${encodeURIComponent(
      bodyPart
    )}?limit=${limit}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching exercises by body part:", error);
      return [];
    }
  }
  async function fetchUser() {

		let email = "";

		if (user?.updatedSettings === undefined) {
			email = user?.email;
		} else {
			email = user?.updatedSettings.email;
		}

		const response = await fetch(
			"https://fitnessproject.onrender.com/api/user/getUser",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			}
		);

		const data = await response.json();
    return data;
	}

  return {
    exercises_call,
    exercise_name,
    exercise_id,
    exercise_part,
    deleteWorkoutPlan,
    fetchWorkouts,
    updateSettings,
    fetchUser,
    addToDatabase,
    addFinishedWorkout,
    addExercise,
    deleteExercise
  };
})();
