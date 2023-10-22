// Components and Custom components
import React, { useState, useEffect, lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LoadingComp from "../components/Loading";

// Interfaces
import ExerciseDay from "../interfaces/ExerciseDay";

// APi
import Exercise_api from "../models/apimodel";

const ItemView = lazy(() => import("../pages/ItemPage/ItemView"));
const AddExerciseToDay = lazy(
	() => import("../pages/ItemPage/AddExerciseToDay")
);


function ItemPagePresenter(): JSX.Element {
	// WorkoutData = Data that comes from the API
	const [workoutsData, setWorkoutsData] = useState<ExerciseDay[]>([]);
	// MyWorkouts = Data that comes from the database --> User's choice
	const [myworkouts, setmyWorkouts] = useState<ExerciseDay[]>([]);
	// To show the loading screen when fetching data from the API
	const [loading, setLoading] = useState(false);
	// Render the AddExerciseToDay component
	const [addWorkout, setAddWorkout] = useState(false);

	// For the user to add workouts
	const [selectedWorkoutName, setSelectedWorkoutName] = useState("");
	const [selectedBodyPart, setSelectedBodyPart] = useState("");
	const [selectedTarget, setSelectedTarget] = useState("");
	const [selectedEquipment, setSelectedEquipment] = useState("");
	const [numberOfSets, setNumberOfSets] = useState(0);
	const [numberOfReps, setNumberOfReps] = useState(0);

	// To bring in userData
	const userJSON = localStorage.getItem("userFittness");
	const userParsed = userJSON ? JSON.parse(userJSON) : null;
	const user = userParsed.token;

	// To get data from the URL
	const location = useLocation();
	const searchData = new URLSearchParams(location.search).get("data");
	const dataJSON = searchData
		? JSON.parse(decodeURIComponent(searchData))
		: null;
	const navigate = useNavigate();

	// Delete workout from the database
	async function deleteWorkoutHandler(index: number) {
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
					plan_id: dataJSON.id,
				}),
			}
		);

		if (response.status !== 200) {
			alert("Could not delete workout");
		} else {
			window.location.reload();
		}
	}

	// Adds workout to the database
	async function addWorkoutHandler() {
		setAddWorkout(true);
		setLoading(true);

		// Check if workoutsData is already populated. If it is then use that data --> Cache data
		if (workoutsData.length > 0) {
			setLoading(false);
			return; // Skip API call
		}
		Exercise_api.exercises_call(2000)
			.then((data) => {
				const updatedWorkouts = data.map((exercise) => ({
					...exercise,
					sets: null,
					reps: null,
				}));
				setWorkoutsData(updatedWorkouts);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	// Fetches the workouts from the database
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
		setmyWorkouts(data);
	}

	async function addToDatabase(id: String) {
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
			setAddWorkout(false);
		} else {
			console.log(data.Error);
			alert("Fail");
		}
	}

	useEffect(() => {
		fetchWorkouts();
	});
	return (
		<div>
			<Suspense fallback={<div> <LoadingComp loading={true}/>  </div>}>
				<ItemView
					deleteWorkoutHandler={deleteWorkoutHandler}
					myworkouts={myworkouts}
					addWorkoutHandler={addWorkoutHandler}
					navigate={navigate}
					workoutName={dataJSON.name}
					addExerciseToDay={
						<AddExerciseToDay
							// Function that adds workouts to the database
							addToDatabase={addToDatabase}
							// To fetch data from the API
							workoutsData={workoutsData}
							// To fetch workouts from the database
							setmyWorkouts={setmyWorkouts}
							// To Render Add page or not
							setAddWorkout={setAddWorkout}
							// To show the loading screen when fetching data from the API
							loading={loading}
							id={dataJSON.id}
							// These are going to be added to the database
							selectedWorkoutName={selectedWorkoutName}
							selectedBodyPart={selectedBodyPart}
							selectedTarget={selectedTarget}
							selectedEquipment={selectedEquipment}
							numberOfSets={numberOfSets}
							numberOfReps={numberOfReps}
							// To add workouts to the database
							setSelectedWorkoutName={setSelectedWorkoutName}
							setSelectedBodyPart={setSelectedBodyPart}
							setSelectedTarget={setSelectedTarget}
							setSelectedEquipment={setSelectedEquipment}
							setNumberOfSets={setNumberOfSets}
							setNumberOfReps={setNumberOfReps}
						/>
					}
					addWorkout={addWorkout}
				/>
			</Suspense>
		</div>
	);
}

export default ItemPagePresenter;
