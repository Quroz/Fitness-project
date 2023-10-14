// Components and Custom components
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiFillEdit } from "react-icons/ai";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import ItemView from "../pages/ItemPage/ItemView";
import AddExerciseToDay from "../pages/ItemPage/AddExerciseToDay";

// Interfaces
import ExerciseDay from "../interfaces/ExerciseDay";

// APi
import Exercise_api from "../models/apimodel";

type Props = {};

function ItemPagePresenter({}: Props): JSX.Element {
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
	async function deleteWorkoutHandler(name: String) {
		const response = await fetch("http://localhost:4000/api/workout/delete", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user}`,
			},
			body: JSON.stringify({
				name: name,
				plan_id: dataJSON.id,
			}),
		});

		if (response.status !== 200) {
			alert("Could not delete workout");
		} else {
			window.location.reload();
		}

		console.log("deleteWorkoutHandler");
	}

	// Adds workout to the database
	async function addWorkoutHandler() {
		setAddWorkout(true);
		setLoading(true);
		Exercise_api.exercises_call(2000).then((data) => {
			console.log(data);
			const updatedWorkouts = data.map((exercise) => ({
				...exercise,
				sets: null,
				reps: null,
			}));
			setWorkoutsData(updatedWorkouts);
		});
		setLoading(false);
		console.log("addWorkoutHandler");
		console.log("Show the AddExerciseToDay component: " + addWorkout);
	}

	// Fetches the workouts from the database
	async function fetchWorkouts() {
		console.log("Fetching Data from user: ", user);
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
		setmyWorkouts(data);
		console.log("workouts", setmyWorkouts);
	}

	async function addToDatabase(id: String) {
		const response = await fetch("http://localhost:4000/api/workout/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user}`,
			},
			body: JSON.stringify({
				name: selectedWorkoutName,
				bodyPart: selectedBodyPart,
				muscleTarget: selectedTarget,
				equipment: selectedEquipment,
				sets: numberOfSets,
				reps: numberOfReps,
				plan_id: id,
			}),
		});
		const data = await response.json();
		console.log(data);
		if (response.status === 200) {
			alert("Added!");
			window.location.reload();
		} else {
			console.log(data.Error);
			alert("Fail");
		}
	}

	useEffect(() => {
		fetchWorkouts();
	}, []);

	return (
		<div>
			<ItemView
				deleteWorkoutHandler={deleteWorkoutHandler}
				myworkouts={myworkouts}
				addWorkoutHandler={addWorkoutHandler}
				navigate={navigate}
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
		</div>
	);
}

export default ItemPagePresenter;
