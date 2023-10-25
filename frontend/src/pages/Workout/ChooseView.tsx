import React, { useState } from "react";
import { AiOutlineQuestionCircle, AiOutlineClose } from "react-icons/ai";

type Props = {
	showLog: boolean;
	renderHandler: (choice: string) => void;
	myWorkouts: boolean;
	click: boolean;
	setClick: React.Dispatch<React.SetStateAction<boolean>>;
};

function ChooseView({
	showLog,
	renderHandler,
	myWorkouts,
	click,
	setClick,
}: Props): JSX.Element {
	return (
		<div className="h-[200px] w-full relative">
			{!click ? (
				<AiOutlineQuestionCircle
					className="absolute z-50 cursor-pointer right-2 top-2"
					size={24}
					onClick={() => setClick(!click)}
				/>
			) : (
				<AiOutlineClose
					className="absolute z-50 cursor-pointer right-2 top-2"
					size={20}
					onClick={() => setClick(!click)}
				/>
			)}

			<div
				className={
					click
						? "absolute top-2 transform duration-300 ease-in flex items-center justify-center w-full mt-4"
						: "absolute top-[-100%]"
				}
			>
				<div className="flex flex-col items-center w-[400px] bg-gray-200 rounded-md p-2 relative">
					<h1>
						Click <strong>"Add Workout"</strong> to create a new workout
						session.
					</h1>
					<h1>
						Select <strong>"Edit Workout"</strong> to add exercises to your
						workout.
					</h1>
					<h1>
						Access <strong>"Workout Logs"</strong> to view your completed
						workouts.
					</h1>
				</div>
			</div>
			<div className="h-full w-[80%] mx-auto relative z-50">
				<h1 className="pt-12 text-4xl">Workout Page</h1>
				<div className="absolute flex items-center w-full gap-12 bottom-8">
					<h1
						className={
							showLog
								? "text-md text-black cursor-pointer border-transparent border-b-2 hover:border-lime-300"
								: "text-md text-gray-500 cursor-pointer border-transparent border-b-2 hover:border-lime-300"
						}
						onClick={() => renderHandler("Workout Logs")}
					>
						Workout Logs
					</h1>
					<h1
						className={
							myWorkouts
								? "text-md text-black cursor-pointer border-transparent border-b-2 hover:border-lime-300"
								: "text-md text-gray-500 cursor-pointer border-transparent border-b-2 hover:border-lime-300"
						}
						onClick={() => renderHandler("My Workouts")}
					>
						Workout Plan
					</h1>
				</div>
			</div>
		</div>
	);
}

export default ChooseView;
