import React from "react";
import WorkoutDay from "../../interfaces/WorkoutDay";
import { AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";

type Props = {
	workoutDays: WorkoutDay[];
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	addPlan: boolean;
	setAddPlan: React.Dispatch<React.SetStateAction<boolean>>;
	itemPage: (item: WorkoutDay) => void;
	toWorkout: (item: WorkoutDay) => void;
	deleteWorkoutPlan: (id: number) => void;
	addPlanPopup: JSX.Element;
	searchHandler: (name: string) => void;
};

function WorkoutPlans({
	workoutDays,
	search,
	setSearch,
	addPlan,
	setAddPlan,
	itemPage,
	deleteWorkoutPlan,
	addPlanPopup,
	searchHandler,
	toWorkout
}: Props): JSX.Element {
	console.log(workoutDays);

	return (
		<div className="mt-24 w-[80%] mx-auto">
			<div className="flex flex-col items-center justify-between w-full gap-2 md:gap-2 md:flex-row">
				<h1>{workoutDays.length} Workouts</h1>
				<div className="flex items-center justify-between w-full gap-2 md:w-auto">
					<input
						className="bg-white border-[1px] border-gray-300 indent-1 rounded-sm py-2 w-full md:w-[150px] p-1 px-2 text-black text-sm"
						placeholder="Search by workout"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<div className="flex items-center w-full gap-1">
						<button
							className="bg-lime-300  rounded-sm py-2 w-full md:w-[100px] text-sm hover:bg-lime-200"
							onClick={() => searchHandler(search)}>
							Search
						</button>
						<button
							className="bg-lime-300  rounded-sm py-2 w-full md:w-[100px] text-sm hover:bg-lime-200"
							onClick={() => setAddPlan(true)}
						>
							Add Workout
						</button>
					</div>
				</div>
			</div>
			<div className="relative flex flex-col w-full gap-4 my-8 overflow-y-auto">
				{workoutDays.map((item: WorkoutDay, index: number) => (
					<div
						className="gap-4 md:gap-0 flex flex-col md:flex-row items-center justify-around w-full py-4 bg-white border-[1px] border-gray-300 rounded-md relative"
						key={index}
					>
						<div className="flex items-center justify-around w-full">
							<h1>
								<strong>Day:</strong> {item.workoutDay}
							</h1>
							<h1>
								<strong>Name:</strong> {item.workoutName}
							</h1>
						</div>
					
						<div className="flex items-center justify-around w-full gap-4">
							<div className="flex flex-col items-center justify-center w-full gap-4 mx-4 md:mx-0 md:flex-row">
								<button
									className="bg-gray-200 rounded-md py-2 w-full md:w-[100px] text-sm hover:bg-lime-100"		
									onClick={() => toWorkout(item)}>
									To workout
								</button>
								<button
									className="bg-gray-200 rounded-md py-2 w-full md:w-[100px] text-sm hover:bg-lime-100"		
									onClick={() => itemPage(item)}>
									Edit Workout
								</button>
								
							</div>
							<AiOutlineClose
									className="absolute cursor-pointer top-2 right-2"
									color="red"
									size={24}
									onClick={() => deleteWorkoutPlan(item.plan_id)}
								/>
						</div>
					</div>
				))}
			</div>
			{addPlan && (
				<div
					className={
						addPlan
							? "bottom-0 left-0 right-0 top-[30%] m-auto absolute z-20 w-[400px] duration-500 ease-in"
							: "left-0 top-[-100%] absolute z-20 h-[400px] w-[400px]"
					}
				>
					{addPlanPopup}
				</div>
			)}
		</div>
	);
}

export default WorkoutPlans;
