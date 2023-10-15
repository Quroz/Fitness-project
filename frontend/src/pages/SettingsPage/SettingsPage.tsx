import React, { useState, useEffect } from "react";
import { AiFillCheckCircle, AiOutlineArrowLeft } from "react-icons/ai";
import User from "../../interfaces/User";

type Props = {
	user: User | null;
	weight: string;
	setWeight: React.Dispatch<React.SetStateAction<string>>;
	weightOptions: number[];
	height: string;
	setHeight: React.Dispatch<React.SetStateAction<string>>;
	heightOptions: number[];
	updateSettings: (type: string) => void;
	setGoal: React.Dispatch<React.SetStateAction<string>>;
	goal: string;
	setAge: React.Dispatch<React.SetStateAction<string>>;
	age: string;
	showGoals: boolean;
	setShowGoals: React.Dispatch<React.SetStateAction<boolean>>;
	filteredGoals: string[];
	ageOptions: number[];
};

function SettingsPage({
	user,
	weight,
	setWeight,
	weightOptions,
	height,
	setHeight,
	heightOptions,
	updateSettings,
	setGoal,
	goal,
	setAge,
	age,
	showGoals,
	setShowGoals,
	filteredGoals,
	ageOptions,
}: Props): JSX.Element {
	return (
		<div className="w-full min-h-screen py-16 bg-lime-300">
			<div className="h-full w-[70%] mx-auto flex flex-col gap-4">
				<h1 className="text-2xl font-bold">Hi, {user?.name}</h1>
				<div className="p-4 bg-white rounded-md">
					<h2 className="mb-2 text-xl font-semibold">
						Welcome to Your Settings
					</h2>
					<p className="text-gray-600">
						This is your personalized settings page, where you can update and
						manage your profile information. Feel free to make changes to your
						weight, height, age, and set new goals to track your progress.
					</p>
				</div>
				<div className="flex flex-col bg-white rounded-md">
					<div className="flex items-center justify-around w-full p-8">
						<h1 className="text-2xl">
							Current weight: <strong>{user?.weight} kg</strong>
						</h1>
						<div className="flex items-center gap-4">
							<select
								id="weightDropdown"
								value={weight}
								onChange={(e) => setWeight(e.target.value)}
								className="border-black border-[1px] rounded-md p-1"
							>
								<option value="">Select Weight (kg)</option>
								{weightOptions.map((weight) => (
									<option key={weight} value={weight}>
										{weight} kg
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="flex items-center justify-around w-full p-8">
						<h1 className="text-2xl">
							Current height: <strong>{user?.height} cm</strong>
						</h1>
						<div className="flex items-center gap-4">
							<select
								id="heightDropdown"
								value={height}
								onChange={(e) => setHeight(e.target.value)}
								className="border-black border-[1px] rounded-md p-1"
							>
								<option value="">Select Height (cm)</option>
								{heightOptions.map((height) => (
									<option key={height} value={height}>
										{height} cm
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="flex items-center justify-around w-full p-8">
						<h1 className="text-2xl">
							Current age: <strong>{user?.age} years</strong>
						</h1>
						<div className="flex items-center gap-4">
							<select
								id="ageDropdown"
								value={age}
								onChange={(e) => setAge(e.target.value)}
								className="border-black border-[1px] rounded-md p-1"
							>
								<option value="">Select age</option>
								{ageOptions.map((age) => (
									<option key={age} value={age}>
										{age} years
									</option>
								))}
							</select>
						</div>
					</div>
					<AiFillCheckCircle
						size={40}
						className="self-center mb-4 cursor-pointer"
						color="green"
						onClick={() => updateSettings("")}
					/>
				</div>
				{showGoals ? (
					<div className="relative w-full bg-white rounded-md">
						<h1 className="pt-4 text-2xl font-semibold text-center">
							Your goals
						</h1>
						<div className="w-full overflow-y-scroll flex flex-col gap-2 h-[250px] p-8">
							<AiOutlineArrowLeft
								className="absolute cursor-pointer top-1 left-1"
								size={24}
								onClick={() => setShowGoals(!showGoals)}
							/>
							{filteredGoals.map((goal: string, index: number) => (
								<div
									className="border-black border-[1px] bg-gray-100 p-8 relative rounded-md"
									key={index}
								>
									<h1 className="absolute font-bold top-1 left-1">
										{index + 1}
									</h1>
									<p>{goal}</p>
								</div>
							))}
						</div>
					</div>
				) : (
					<div className="flex flex-col justify-around w-full gap-2 p-8 bg-white rounded-md md:flex-row md:gap-0">
						<div className="flex flex-col items-center gap-4">
							<h1 className="text-2xl">Do you have any new goals today?</h1>
							<button
								className="px-2 py-1 text-black rounded-md bg-lime-300 hover:bg-lime-200"
								onClick={() => setShowGoals(!showGoals)}
							>
								View current goals
							</button>
						</div>
						<div className="flex flex-col gap-2">
							<textarea
								rows={4}
								className="border-black border-[1px] rounded-md p-1 w-[250px]"
								placeholder="Write any goal.."
								value={goal}
								onChange={(e) => setGoal(e.target.value)}
							/>
							<button
								className="px-2 py-1 text-black rounded-md bg-lime-300 hover:bg-lime-200"
								onClick={() => updateSettings("goal")}
							>
								Add goal
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default SettingsPage;
