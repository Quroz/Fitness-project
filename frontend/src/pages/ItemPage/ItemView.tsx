import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { AiOutlineClose, AiFillEdit } from "react-icons/ai";
import ExerciseDay from "../../interfaces/ExerciseDay";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
	deleteWorkoutHandler: (name: number) => void;
	myworkouts: ExerciseDay[];
	addWorkoutHandler: () => void;
	navigate: ReturnType<typeof useNavigate>;
	addExerciseToDay: JSX.Element; // Custom component
	addWorkout: React.SetStateAction<boolean>;
	workoutName: String;
};

function ItemView({
	deleteWorkoutHandler,
	myworkouts,
	addWorkoutHandler,
	navigate,
	addExerciseToDay,
	addWorkout,
	workoutName
}: Props): JSX.Element {

	console.log("myworkouts:", myworkouts);

	return (
		<div className="relative w-full h-screen">
			<img
				src="https://assets.website-files.com/63765b8cfd2906b4a1713e44/63a204259f38bb4fbd9699a4_CROSSFIT%20GYM%20IN%20LAKE%20FOREST.jpg"
				className="sticky object-cover w-full h-full"
			/>
			<BsFillArrowLeftCircleFill
				className="absolute z-20 cursor-pointer left-2 top-2"
				size={24}
				color="white"
				onClick={() => navigate(`/workoutPlan`)}
			/>
			<div className="absolute top-0 left-0 z-10 flex flex-col justify-center items-center w-full h-full gap-4 p-8 pt-48 bg-black/40">
				<h1 className="font-bold text-white text-7xl">{workoutName}</h1>
				<h1 className="text-xl text-white">
					Your one-stop destination for creating, tracking, and achieving your
					fitness goals.
				</h1>
				<div className="flex items-center justify-center w-full gap-48 mt-8">
					<button
						className="px-4 py-4 w-[250px] bg-lime-300 text-white font-bold rounded-md hover:bg-lime-200"
						onClick={() => {
							addWorkoutHandler();
							console.log("workout:", addWorkout);
						}}
					>
						Add workout
					</button>
				</div>
				{myworkouts.length > 0 ? (
					<div className="overflow-y-auto flex flex-col gap-8 pt-4 w-full md:w-[50%]">
						{myworkouts?.map((workout: ExerciseDay, index: number) => (
							<div className="relative flex flex-col items-center justify-around w-full gap-2 py-4 rounded-lg cursor-pointer bg-gray-200/70 hover:bg-gray-50">
								<div className="absolute flex items-center gap-2 top-1 right-2">
									<AiOutlineClose
										color="red"
										size={20}
										onClick={() => deleteWorkoutHandler(index)}
									/>
								</div>
								{/*<div className= {workout.check != 0 ? 'absolute left-2 top-1 border-[1px] border-black w-4 h-4 bg-green-500' : 'absolute left-2 top-2 border-[1px] border-black w-4 h-4'} onClick={workout.check == 0 ? () => checkHandler(workout.plan_id, workout.name, 1) : () => checkHandler(workout.plan_id, workout.name, 0)}/>*/}
								<h1 className="text-lg">
									<strong>Workout name:</strong> {workout.name}
								</h1>
								<h1 className="text-lg">
									<strong>Bodypart:</strong> {workout.bodyPart}
								</h1>
								<h1 className="text-lg">
									<strong>Equipment:</strong> {workout.equipment}
								</h1>
								<h1 className="text-lg">
									<strong>Amount of sets:</strong> {workout.sets}
								</h1>
								<h1 className="text-lg">
									<strong>Amount of reps:</strong> {workout.reps}
								</h1>
							</div>
						))}
					</div>
				) : (
					<div className="flex items-center p-4 mt-10 rounded-md bg-black/20">
						<h1 className="text-2xl text-white">
							It looks like there are no workouts yet
						</h1>
					</div>
				)}
			</div>
			{addWorkout && (
				<div
					className={
						addWorkout
							? "bottom-0 left-0 right-0 top-[5%] m-auto absolute z-20 w-[400px] duration-500 ease-in"
							: "left-0 top-[-100%] absolute z-20 h-[400px] w-[400px]"
					}
				>
					{addExerciseToDay}
				</div>
			)}
		</div>
	);
}

export default ItemView;
