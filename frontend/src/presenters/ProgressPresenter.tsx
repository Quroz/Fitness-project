import React, { useEffect, useState } from "react";
import Progress from "../pages/Progress";
import { useLocation } from "react-router-dom";
import Workout from "../interfaces/WorkoutInterface";
import {  useNavigate } from "react-router-dom";

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

	const navigate = useNavigate();

	useEffect(() => {
		async function fetchWorkouts() {
			const response = await fetch(
				"https://fitnessproject.onrender.com/api/workout/getExercises",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user}`,
					},
					body: JSON.stringify({
						plan_id: dataJSON.id,
					}),
				}
			);
			const data = await response.json();
			setWorkouts(data);
			setLoading(false);
		}
		fetchWorkouts();
	}, []);


	async function finishWorkout() {
		const response = await fetch(
			"https://fitnessproject.onrender.com/api/workout/addCompletedWorkout",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user}`,
				},
				body: JSON.stringify({
					plan_id: dataJSON.id,
					workout: currentWorkout,
					date:
						new Date().getDate() +
						"/" +
						new Date().getMonth() +
						"/" +
						new Date().getFullYear(),
				}),
			}
		);
		const data = await response.json();

		if (response.status !== 200) {
			alert("Something went wrong, please try again");
		} else {
			alert("Workout completed");
			navigate(`/workoutPlan`);
		}
	}

	useEffect(() => {
		let copy: Workout[] = new Array(workouts.length);

		for (let index = 0; index < workouts.length; index++) {
			copy[index] = {
				name: workouts[index].name,
				equipment: workouts[index].equipment,
				bodyPart: workouts[index].bodyPart,
				sets: workouts[index].sets,
				reps: workouts[index].reps,
				completedSets: [],
			};
			for (let i = 0; i < workouts[index].sets; i++) {
				copy[index].completedSets.push({
					reps: workouts[index].reps,
					weight: 0,
				});
			}
		}

		setCurrentWorkout(copy);
	}, [workouts]);


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
		else if (id > currentWorkout.length - 1)
			setCurrent(currentWorkout.length - 1);
		else {
			setCurrent(id);
		}
	}

	return (
		<Progress
			current={current}
			//loading={loading}
			finishWorkout={finishWorkout}
			addWeight={addWeight}
			addReps={addReps}
			addSet={addSet}
			handleExcerciseChange={handleExcerciseChange}
			currentWorkout={currentWorkout}
			setCurrentWorkout={setCurrentWorkout}
			workoutName={dataJSON.name}
		/>
	);
};
