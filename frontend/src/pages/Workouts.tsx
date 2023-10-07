import React, { useState } from "react";
import MyWorkouts from "../components/MyWorkouts";
import AllWorkouts from "../components/AllWorkouts";

type Props = {};

function Workouts({}: Props) {
	const [search, setSearch] = useState("");
	const [myWorkouts, setMyWorkouts] = useState(true);
	const [allWorkouts, setAllWorkouts] = useState(false);

	function renderHandler(choice: string) {
		if (choice === "myWorkouts") {
			setMyWorkouts(true);
			setAllWorkouts(false);
		} else if (choice === "allWorkouts") {
			setMyWorkouts(false);
			setAllWorkouts(true);
		}
	}

	return (
		<div className="flex flex-col w-full min-h-screen">
			<div className="h-[200px] w-full">
				<div className="h-full w-[80%] mx-auto relative">
					<h1 className="pt-12 text-4xl">Workout Page</h1>
					<div className="absolute flex items-center w-full gap-12 bottom-8">
						<h1
							className={
								allWorkouts
									? "text-md text-black cursor-pointer border-transparent border-b-2 hover:border-lime-300"
									: "text-md text-gray-500 cursor-pointer border-transparent border-b-2 hover:border-lime-300"
							}
							onClick={() => renderHandler("allWorkouts")}
						>
							All Workouts
						</h1>
						<h1
							className={
								myWorkouts
									? "text-md text-black cursor-pointer border-transparent border-b-2 hover:border-lime-300"
									: "text-md text-gray-500 cursor-pointer border-transparent border-b-2 hover:border-lime-300"
							}
							onClick={() => renderHandler("myWorkouts")}
						>
							My Workouts
						</h1>
					</div>
				</div>
			</div>
			<div className="bg-[#edeaea] flex-1 ">
				{myWorkouts && <MyWorkouts />}
				{allWorkouts && <AllWorkouts />}
			</div>
		</div>
	);
}

export default Workouts;
