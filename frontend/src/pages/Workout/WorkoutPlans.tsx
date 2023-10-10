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
	searchHandler: any,
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
			<div className="flex items-center justify-between">
				<h1>{workoutDays.length} Workouts</h1>
				<div className="flex items-center gap-2">
					<input
						className="bg-white border-[1px] border-gray-300 indent-1 rounded-sm py-2 w-[250px] text-black"
						placeholder="Search workout by name"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button
						className="bg-lime-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200"
						onClick={() => searchHandler(search)}>
						Search
					</button>
					<button
						className="bg-lime-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200"
						onClick={() => setAddPlan(true)}
					>
						Add Workout
					</button>
				</div>
			</div>
			<div className="flex flex-col w-full gap-4 my-8 overflow-y-auto">
				{workoutDays.map((item: WorkoutDay, index: number) => (
					<div
						className="flex items-center justify-around max-w-full py-4 bg-white border-[1px] border-gray-300 rounded-md relative"
						key={index}
					>
						<div className="flex items-center justify-between w-[200px] ml-5">
						<h1>
							<strong>Day:</strong> {item.day}
						</h1>
						</div>
						<div className="flex items-center justify-between w-[450px] ml-5">
						<h1>
							<strong>Name:</strong> {item.name}
						</h1>
						</div>
						<div className="flex items-center gap-4 top-4 right-2 w-[250px]">
							<button
								className="bg-gray-200 rounded-md py-2 w-[100px] text-sm hover:bg-lime-100"		
								onClick={() => toWorkout(item)}>
								 To workout
							</button>
							<button
								className="bg-gray-200 rounded-md py-2 w-[100px] text-sm hover:bg-lime-100"		
								onClick={() => itemPage(item)}>
								 Edit Workout
							</button>
							
						</div>
						<AiOutlineClose
								className="cursor-pointer absolute top-5 right-2"
								color="red"
								size={24}
								onClick={() => deleteWorkoutPlan(item.id)}
							/>
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
