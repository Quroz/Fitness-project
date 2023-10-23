import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Audio } from "react-loader-spinner";
import ExerciseDay from "../../interfaces/ExerciseDay";
import Exercise from "../../interfaces/Exercise";

type Props = {
	//
	addToDatabase:( id:number,selectedWorkoutName:string,selectedBodyPart:string,selectedEquipment:string,numberOfSets:number,numberOfReps:number ) => void;// Function to add the workout to the database
	workoutsData: ExerciseDay[]; // Data from the API
	setAddWorkout: React.Dispatch<React.SetStateAction<boolean>>; // To render the AddExerciseToDay component
	loading: boolean; // To show the loading screen when fetching data from the API
	id: number; // To add the workout to the database

	// Values to be added into the database
	selectedWorkoutName: string;
	selectedBodyPart: string;
	selectedEquipment: string;
	numberOfSets: number;
	numberOfReps: number;

	// To set them in the database
	setSelectedWorkoutName: React.Dispatch<React.SetStateAction<string>>;
	setSelectedBodyPart: React.Dispatch<React.SetStateAction<string>>;
	setSelectedEquipment: React.Dispatch<React.SetStateAction<string>>;
	setNumberOfSets: React.Dispatch<React.SetStateAction<number>>;
	setNumberOfReps: React.Dispatch<React.SetStateAction<number>>;
};

function AddExerciseToDay({
	addToDatabase,
	workoutsData,
	setAddWorkout,
	loading,
	id,

	// Values to be added into the database
	selectedWorkoutName,
	selectedBodyPart,
	selectedEquipment,
	numberOfSets,
	numberOfReps,

	// To set them in the database
	setSelectedWorkoutName,
	setSelectedBodyPart,
	setSelectedEquipment,
	setNumberOfSets,
	setNumberOfReps,
}: Props) {
	const workoutName = Array.from(
		new Set(workoutsData.map((item: Exercise) => item.name))
	);

	return (
		<div className="flex flex-col">
			<div className="relative flex items-center justify-center h-12 bg-lime-300 rounded-t-md">
				<AiOutlineClose
					className="absolute text-xl text-white cursor-pointer right-4"
					onClick={() => setAddWorkout(false)}
				/>
				<h1 className="text-2xl text-white">Add Workout</h1>
			</div>
			<div className="relative flex flex-col flex-1 gap-4 p-4 bg-gray-100 rounded-b-md">
				{loading ? (
					<Audio
						height="80"
						width="80"
						wrapperClass="flex justify-center items-center"
						color="green"
						ariaLabel="loading"
					/>
				) : (
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-4">
							<label className="text-lg">Exercise Name</label>
							<select
								id="workoutName"
								name="workoutName"
								value={selectedWorkoutName}
								onChange={(e) => {
									setSelectedWorkoutName(e.target.value);
									// Find the exercise from the workoutsData array and grab the bodypart, target and equipment
									const exercise = workoutsData.find(
										(exercise) => exercise.name === e.target.value
									);
									setSelectedBodyPart(exercise?.bodyPart || "");
									//setSelectedTarget(exercise?.muscleTarget || "");
									setSelectedEquipment(exercise?.equipment || "");
									console.log("exercise added!");
								}}
							>
								<option value="" disabled>
									Select workout name
								</option>
								{workoutName?.map((item: any) => (
									<option key={item}>{item}</option>
								))}
							</select>
						</div>

						<label className="text-lg">Amount of sets</label>
						<input
							type="number"
							id="sets"
							name="sets"
							min="1"
							max="100"
							value={numberOfSets}
							onChange={(e) => setNumberOfSets(Number(e.target.value))}
						/>
						<label className="text-lg">Amount of reps</label>
						<input
							type="number"
							id="reps"
							name="reps"
							min="1"
							max="100"
							value={numberOfReps}
							onChange={(e) => setNumberOfReps(Number(e.target.value))}
						/>
					</div>
				)}
				<button
					className="px-2 py-2 mt-8 text-sm font-bold text-white rounded-md bg-lime-300 hover:bg-lime-200"
					onClick={() => {addToDatabase(id, selectedWorkoutName, selectedBodyPart, selectedEquipment, numberOfSets, numberOfReps); setAddWorkout(false)}}
				>
					Add
				</button>
			</div>
		</div>
	);
}

export default AddExerciseToDay;
