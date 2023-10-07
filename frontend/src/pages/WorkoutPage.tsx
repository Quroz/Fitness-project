import React, { useState } from "react";
import AddWorkout from "../components/AddWorkout";

type Props = {};

const WorkoutPage = (props: Props) => {
	const [addWorkout, setAddWorkout] = useState(false);
	const [myWorkouts, setMyWorkouts] = useState(false);

	return (
		<div className="relative w-full h-screen">
			<img
				src="https://assets.website-files.com/63765b8cfd2906b4a1713e44/63a204259f38bb4fbd9699a4_CROSSFIT%20GYM%20IN%20LAKE%20FOREST.jpg"
				className="sticky object-cover w-full h-full"
			/>
			<div className="absolute top-0 left-0 z-10 flex flex-col items-center w-full h-full gap-4 p-8 pt-48 bg-black/40">
				<h1 className="font-bold text-white text-7xl">My workout plan</h1>
				<h1 className="text-xl text-white">
					Your one-stop destination for creating, tracking, and achieving your
					fitness goals.
				</h1>
				<div className="flex items-center justify-center w-full gap-48 mt-8">
					<button
						className="px-4 py-4 w-[250px] bg-orange-500 text-white font-bold rounded-md"
						onClick={() => setAddWorkout(true)}
					>
						Add workout
					</button>
					<button
						className="px-4 py-4 w-[250px] bg-green-500 text-white font-bold rounded-md"
						onClick={() => setMyWorkouts(!myWorkouts)}
					>
						My workouts
					</button>
				</div>
				{myWorkouts && (
					<div className="flex flex-col w-full gap-8 pt-4 overflow-y-auto rounded-md bg-black/10">
						<div className="flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100">
							<h1 className="font-[700]">Dag 1</h1>
							<h1 className="font-[700]">Lower Body</h1>
							<h1 className="font-[700]">5 workouts</h1>
						</div>
						<div className="flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100">
							<h1 className="font-[700]">Dag 1</h1>
							<h1 className="font-[700]">Lower Body</h1>
							<h1 className="font-[700]">5 workouts</h1>
						</div>
						<div className="flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 ">
							<h1 className="font-[700]">Dag 1</h1>
							<h1 className="font-[700]">Lower Body</h1>
							<h1 className="font-[700]">5 workouts</h1>
						</div>
						<div className="flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100">
							<h1 className="font-[700]">Dag 1</h1>
							<h1 className="font-[700]">Lower Body</h1>
							<h1 className="font-[700]">5 workouts</h1>
						</div>
						<div className="flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100">
							<h1 className="font-[700]">Dag 1</h1>
							<h1 className="font-[700]">Lower Body</h1>
							<h1 className="font-[700]">5 workouts</h1>
						</div>
						<div className="flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100">
							<h1 className="font-[700]">Dag 1</h1>
							<h1 className="font-[700]">Lower Body</h1>
							<h1 className="font-[700]">5 workouts</h1>
						</div>
						<div className="flex items-center justify-around max-w-full py-4 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100">
							<h1 className="font-[700]">Dag 1</h1>
							<h1 className="font-[700]">Lower Body</h1>
							<h1 className="font-[700]">5 workouts</h1>
						</div>
					</div>
				)}
			</div>
			<div
				className={
					addWorkout
						? "bottom-0 left-0 right-0 top-[30%] m-auto absolute z-20 w-[400px] duration-500 ease-in"
						: "left-0 top-[-100%] absolute z-20 h-[400px] w-[400px]"
				}
			>
				{/*<AddWorkout setAddWorkout = {setAddWorkout}/>*/}
			</div>
		</div>
	);
};

export default WorkoutPage;
