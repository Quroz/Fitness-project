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
		console.log("addWorkoutHandler");
		console.log("Show the AddExerciseToDay component: " + addWorkout);
	}

	return (
		<div>
			Hello ItemPresenter
			<ItemView
				deleteWorkoutHandler={deleteWorkoutHandler}
				myworkouts={myworkouts}
				addWorkoutHandler={addWorkoutHandler}
				navigate={navigate}
			/>
		</div>
	);
}

export default ItemPagePresenter;
