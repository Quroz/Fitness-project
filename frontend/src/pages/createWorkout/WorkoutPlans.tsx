import React from "react";
import WorkoutDay from "../../interfaces/WorkoutDay";
import { AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";

type Props = {
	workoutDays: WorkoutDay[];
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	addPlan: boolean;
	setAddPlan: React.Dispatch<React.SetStateAction<boolean>>;
	checkHandler: (id: number) => void;
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
	checkHandler,
	itemPage,
	deleteWorkoutPlan,
	addPlanPopup,
	searchHandler,
	toWorkout
}: Props): JSX.Element {


	return (
		<div className="mt-24 w-[80%] mx-auto">
			<div className="gap-2 md:gap-2 w-full flex flex-col md:flex-row items-center justify-between">
				<h1>{workoutDays.length} Workouts</h1>
				<div className="w-full md:w-auto flex items-center gap-2 justify-between">
					<input
						className="bg-white border-[1px] border-gray-300 indent-1 rounded-sm py-2 w-full md:w-[150px] p-1 px-2 text-black text-sm"
						placeholder="Search by workout"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<div className="flex items-center gap-1 w-full">
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
			<div className="flex flex-col w-full gap-4 my-8 overflow-y-auto relative">
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
					
						<div className="w-full flex items-center justify-around gap-4">
							<div className="w-full mx-4 md:mx-0 flex flex-col md:flex-row justify-center items-center gap-4">
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
									className="cursor-pointer absolute top-2 right-2"
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
