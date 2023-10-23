import React, { useState, useEffect, useContext } from "react";
import User from "../interfaces/User";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import AppContext from "../context/app/AppContext";
interface Context {
	user: User
	updateSettings: (email:string, weight:string, height:string, age:string, goal:string) => void;
  }
function SettingsPresenter() {
	// Statefull logic goes here
	const [weight, setWeight] = useState<string>("");
	const [height, setHeight] = useState<string>("");
	const [goal, setGoal] = useState<string>("");
	const [showGoals, setShowGoals] = useState<boolean>(false);
	const [age, setAge] = useState<string>("");
	const context = useContext(AppContext);
	const {
	  user,
	  updateSettings
	} = context as Context;
	// Arrays for the options in the select elements
	const weightOptions = Array.from({ length: 181 }, (_, index) => 20 + index);
	const heightOptions = Array.from({ length: 121 }, (_, index) => 100 + index);
	const ageOptions = Array.from({ length: 100 }, (_, index) => index + 1);

	async function settingsCheck(type: string) {
		if (type === "goal" && goal === "") {
			return alert("You can not add an empty goal, sir!");
		}
		updateSettings(user.email, weight, height, age, goal);
		alert("Goal added");
		setGoal("")

	}
	return (
		<div>
			<SettingsPage
				user={user}
				// Weights
				weight={weight}
				setWeight={setWeight}
				weightOptions={weightOptions}
				// Heights
				height={height}
				setHeight={setHeight}
				heightOptions={heightOptions}
				// Function to update the settings
				updateSettings={settingsCheck}
				// Goals
				setGoal={setGoal}
				setShowGoals={setShowGoals}
				goal={goal}
				showGoals={showGoals}
				// Age
				age={age}
				setAge={setAge}
				ageOptions={ageOptions}
			/>
		</div>
	);
}

export default SettingsPresenter;
