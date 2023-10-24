import React from "react";
import Workout from "../interfaces/WorkoutInterface";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface IProps {
	currentWorkout: Workout[];
	setCurrentWorkout: any;
	current: number;
	addSet: (nrOfSets: number) => void;
	addWeight: (weight: number, setNumber: number) => void;
	addReps: (reps: number, setNumber: number) => void;
	handleExcerciseChange: (id: number) => void;
	finishWorkout: () => void;
	workoutName: String;
}
function Progress({
	currentWorkout,
	addSet,
	addReps,
	addWeight,
	handleExcerciseChange,
	current,
	finishWorkout,
	workoutName,
}: IProps) {
	const navigate = useNavigate();

	return (
		<div className="flex w-full h-screen relative">
			<BsFillArrowLeftCircleFill
				className="absolute z-20 cursor-pointer left-7 top-2"
				size={24}
				color="black"
				onClick={() => navigate(`/workoutPlan`)}
			/>
			<div className="flex w-1/6 flex-col justify-center text-center">
				{currentWorkout.map((ex, id) => {
					if (current === id) {
						return (
							<strong
								key={id}
								onClick={() => {
									handleExcerciseChange(id);
								}}
								className="mt-5"
							>
								{ex.name}
							</strong>
						);
					} else {
						return (
							<p
								key={id}
								onClick={() => {
									handleExcerciseChange(id);
								}}
								className="mt-5 bold text-gray-400 cursor-pointer"
							>
								{ex.name}
							</p>
						);
					}
				})}
			</div>

			<div className="flex w-5/6 flex-col justify-around items-center">
				<div>
					<p className="w-full text-4xl">{workoutName}</p>
				</div>
				{currentWorkout.length === 0 && (
					<h1 className="text-2xl">
						There are no added workouts. Go back to workout page and add some!
					</h1>
				)}

				<div className="flex">
					<strong>
						Sets{" "}
						<input
							min={0}
							max={5}
							type="number"
							onChange={(evt) => {
								addSet(parseInt(evt.target.value));
							}}
							className="w-8"
							placeholder="0"
							value={currentWorkout.length ? currentWorkout[current].sets : 0}
						/>
					</strong>
					<div className="ml-5"></div>
				</div>
				<div className="flex flex-col">
					{currentWorkout.length !== 0 ? (
						currentWorkout[current].completedSets.map(
							(thisSet: any, id: number) => {
								return (
									<div key={"set" + id} className="flex">
										<strong className="mr-8">Set{" " + (id + 1)}</strong>
										<div className="ml-5">
											Reps{" "}
											<input
												min={0}
												max={30}
												type="number"
												className="w-12"
												placeholder="0"
												value={thisSet.reps}
												onChange={(evt) => {
													addReps(parseInt(evt.target.value), id);
												}}
											/>
										</div>
										<div className="ml-5">
											Weight{" "}
											<input
												min={0}
												max={500}
												type="number"
												className="w-15"
												placeholder="0"
												value={thisSet.weight}
												onChange={(evt) => {
													addWeight(parseInt(evt.target.value), id);
												}}
											/>
										</div>
									</div>
								);
							}
						)
					) : (
						<></>
					)}
				</div>
				<div className="flex justify-center h-14 w-full">
					<button
						className= {currentWorkout.length === 0 ? "ml-5 bg-gray-200 rounded-xl h-4/5 shadow w-1/5" : "rounded-xl w-1/5 h-4/5 shadow hover:bg-gray-200"}
						onClick={() => {
							handleExcerciseChange(current - 1);
						}}
						disabled = {currentWorkout.length === 0}
					>
						Previous
					</button>

					<button
						className= {currentWorkout.length === 0 ? "ml-5 bg-gray-200 rounded-xl h-4/5 shadow w-1/5" : "rounded-xl w-1/5 h-4/5 shadow hover:bg-gray-200"}
						onClick={() => {
							handleExcerciseChange(current + 1);
						}}
						disabled = {currentWorkout.length === 0}
					>
						Next
					</button>
					<button
						className= {currentWorkout.length === 0 ? "ml-5 bg-gray-200 rounded-xl h-4/5 shadow w-1/5" : "ml-5 bg-green-400 rounded-xl h-4/5 shadow w-1/5 hover:bg-green-200"}
						onClick={finishWorkout}
						disabled = {currentWorkout.length === 0}
					>
						Finish
					</button>
				</div>
			</div>
		</div>
	);
}

export default Progress;
