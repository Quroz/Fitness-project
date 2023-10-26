// Components and Custom components
import React, { useState, useEffect, lazy, Suspense, useContext } from "react";
import { useNavigate } from "react-router-dom";

import LoadingComp from "../components/Loading";

// Interfaces
import ExerciseDay from "../interfaces/ExerciseDay";

// APi
import { APIController } from "../models/apimodel";
import Exercise from "../interfaces/Exercise";
import AppContext from "../context/app/AppContext";
import WorkoutDay from "../interfaces/WorkoutDay";

const ItemView = lazy(() => import("../pages/ItemPage/ItemView"));
const AddExerciseToDay = lazy(
	() => import("../pages/ItemPage/AddExerciseToDay")
);

interface Context {
	currentWorkout: WorkoutDay;
	addExercise: (
		id: number,
		selectedWorkoutName: string,
		selectedBodyPart: string,
		selectedEquipment: string,
		numberOfSets: number,
		numberOfReps: number
	) => void;
	removeExercise: (exId: number) => void;
	workoutData: WorkoutDay[];
}
function ItemPagePresenter(): JSX.Element {
	const context = useContext(AppContext);
	const { currentWorkout, addExercise, removeExercise } = context as Context;

	// WorkoutData = Data that comes from the API
	const [workoutsData, setWorkoutsData] = useState<ExerciseDay[]>([]);
	// To show the loading screen when fetching data from the API
	const [loading, setLoading] = useState(false);
	// Render the AddExerciseToDay component
	const [addWorkout, setAddWorkout] = useState(false);

	// For the user to add workouts
	const [selectedWorkoutName, setSelectedWorkoutName] = useState("");
	const [selectedBodyPart, setSelectedBodyPart] = useState("");
	const [selectedEquipment, setSelectedEquipment] = useState("");
	const [numberOfSets, setNumberOfSets] = useState(0);
	const [numberOfReps, setNumberOfReps] = useState(0);

	// To get data from the URL
	const navigate = useNavigate();
	useEffect(() => {
		if (!currentWorkout) {
			navigate("/workoutPlan");
		}
	});

	// Adds workout to the database
	async function addWorkoutHandler() {
		setAddWorkout(true);
		setLoading(true);

		// Check if workoutsData is already populated. If it is then use that data --> Cache data
		if (workoutsData.length > 0) {
			setLoading(false);
			return; // Skip API call
		}
		APIController.exercises_call(2000)
			.then((data: Exercise[]) => {
				const updatedWorkouts = data.map((exercise: Exercise) => ({
					...exercise,
					sets: 0,
					reps: 0,
				}));
				setWorkoutsData(updatedWorkouts);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	useEffect(() => {});
	return (
		currentWorkout && (
			<div>
				<Suspense
					fallback={
						<div>
							{" "}
							<LoadingComp loading={true} />{" "}
						</div>
					}
				>
					<ItemView
						deleteWorkoutHandler={removeExercise}
						myworkouts={currentWorkout.exercises}
						addWorkoutHandler={addWorkoutHandler}
						navigate={navigate}
						workoutName={currentWorkout.workoutName}
						addExerciseToDay={
							<AddExerciseToDay
								// Function that adds workouts to the database
								addToDatabase={addExercise}
								// To fetch data from the API
								workoutsData={workoutsData}
								// To Render Add page or not
								setAddWorkout={setAddWorkout}
								// To show the loading screen when fetching data from the API
								loading={loading}
								id={currentWorkout.plan_id}
								// These are going to be added to the database
								selectedWorkoutName={selectedWorkoutName}
								selectedBodyPart={selectedBodyPart}
								selectedEquipment={selectedEquipment}
								numberOfSets={numberOfSets}
								numberOfReps={numberOfReps}
								// To add workouts to the database
								setSelectedWorkoutName={setSelectedWorkoutName}
								setSelectedBodyPart={setSelectedBodyPart}
								setSelectedEquipment={setSelectedEquipment}
								setNumberOfSets={setNumberOfSets}
								setNumberOfReps={setNumberOfReps}
							/>
						}
						addWorkout={addWorkout}
					/>
				</Suspense>
			</div>
		)
	);
}

export default ItemPagePresenter;
