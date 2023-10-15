import React, { useEffect, useState } from "react";
import Progress from "./Progress";
import { useLocation } from "react-router-dom";
interface Workout {
	completedSets: any[];
	exercises: any[];
}

export const ProgressPresenter = () => {
	const [currentWorkout, setCurrentWorkout] = useState<Workout[]>([]);
	const [current, setCurrent] = useState<number>(0);
	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const location = useLocation();
	const searchData = new URLSearchParams(location.search).get("data");
	const dataJSON = searchData
		? JSON.parse(decodeURIComponent(searchData))
		: null;
	const userJSON = localStorage.getItem("userFittness");
	const userParsed = userJSON ? JSON.parse(userJSON) : null;
	const user = userParsed.token;

	console.log("dataJSON progress", dataJSON);

	useEffect(() => {
		async function fetchWorkouts() {
			console.log("fetching i progress", dataJSON.id);
			setLoading(true);
			const response = await fetch("http://localhost:4000/api/workout/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user}`,
				},
				body: JSON.stringify({
					plan_id: dataJSON.id,
				}),
			});
			const data = await response.json();
			setWorkouts(data);
			setLoading(false);
		}
		fetchWorkouts();
	}, []);

	console.log("workouts i progress", workouts)

	useEffect(() => {
		let copy: Workout[] = new Array(workouts.length);
	
		for (let index = 0; index < workouts.length; index++) {
			const workout = workouts[index];
			const exercises = workout.exercises; // Make sure exercises is an array or collection
	
			copy[index] = {
				completedSets: [],
				exercises: exercises, // Include the exercises property
			};
		}
	
		setCurrentWorkout(copy);
	}, [workouts]);
	
	console.log("currentWorkout i progress DE DEN", currentWorkout)

	function addSet(nrOfSets: number) {
		setCurrentWorkout((prevList: Workout[]) => {
			return prevList.map((obj, id) =>
				id === current
					? {
							...obj,
							sets: nrOfSets,
							completedSets:
								obj.completedSets.length < nrOfSets
									
								
								? [...obj.completedSets, { reps: 0, weight: 0 }]
									: obj.completedSets.slice(0, -1),
					  }
					: obj
			);
		});
	}
	function addReps(reps: number, setNumber: number) {
		setCurrentWorkout((prevList: Workout[]) => {
			return prevList.map((obj, id) =>
				id === current
					? {
							...obj,
							completedSets: obj.completedSets.map((set, idx) =>
								idx === setNumber ? { ...set, reps: reps } : set
							),
					  }
					: obj
			);
		});
	}
	function addWeight(weight: number, setNumber: number) {
		setCurrentWorkout((prevList: Workout[]) => {
			return prevList.map((obj, id) =>
				id === current
					? {
							...obj,
							completedSets: obj.completedSets.map((set, idx) =>
								idx === setNumber ? { ...set, weight: weight } : set
							),
					  }
					: obj
			);
		});
	}
	function handleExcerciseChange(id: number) {
		if (id < 0) setCurrent(0);
		else if (id > currentWorkout[0].exercises.length - 1)
			setCurrent(currentWorkout[0].exercises.length - 1);
		else {
			setCurrent(id);
		}
		
	}


	return (
		<Progress
			current={current}
			loading={loading}
			addWeight={addWeight}
			addReps={addReps}
			addSet={addSet}
			handleExcerciseChange={handleExcerciseChange}
			currentWorkout={currentWorkout}
			setCurrentWorkout={setCurrentWorkout}
		/>
	);
};
