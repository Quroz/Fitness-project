import React, { useState, useEffect } from "react";
import User from "../interfaces/User";
import SettingsPage from "../pages/SettingsPage/SettingsPage";

function SettingsPresenter() {
	// Statefull logic goes here
	const [weight, setWeight] = useState<string>("");
	const [height, setHeight] = useState<string>("");
	const [goal, setGoal] = useState<string>("");
	const [user, setUser] = useState<User | null>(null);
	const [showGoals, setShowGoals] = useState<boolean>(false);
	const [age, setAge] = useState<string>("");

	// Arrays for the options in the select elements
	const weightOptions = Array.from({ length: 181 }, (_, index) => 20 + index);
	const heightOptions = Array.from({ length: 121 }, (_, index) => 100 + index);
	const ageOptions = Array.from({ length: 100 }, (_, index) => index + 1);

	//när vi renderar users goals så vill vi inte ha ""
	const filteredGoals = (user?.goals || []).filter(
		(goal) => goal.trim() !== ""
	);

	// Fetches the user from the database
	async function fetchUser() {
		const userJSON = localStorage.getItem("userFittness");
		const userData = userJSON ? JSON.parse(userJSON) : null;

		let email = "";

		if (userData?.updatedSettings === undefined) {
			email = userData?.email;
		} else {
			email = userData?.updatedSettings.email;
		}

		const response = await fetch("https://fitnessproject.onrender.com/api/user/getUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		const data = await response.json();

		if (response.status !== 200) {
			alert(data.Error);
			console.log(data.Error);
		} else {
			setUser(data.user);
		}
	}

	//
	async function updateSettings(type: string) {
		if (type === "goal" && goal === "") {
			return alert("You can not add an empty goal, sir!");
		}

		if (!user) {
			alert("User data not available");
			return;
		}

		const userJSON = localStorage.getItem("userFittness");
		const userData = userJSON ? JSON.parse(userJSON) : null;

		let email = "";

		if (userData?.updatedSettings === undefined) {
			email = userData?.email;
		} else {
			email = userData?.updatedSettings.email;
		}

		const response = await fetch(
			"https://fitnessproject.onrender.com/api/user/updateSettings",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, weight, height, age, goals: [goal] }),
			}
		);

		const data = await response.json();

		if (response.status !== 200) {
			alert(data.Error);
			console.log(data.Error);
		} else {
			localStorage.setItem("userFittness", JSON.stringify(data));
			setUser(data);
			window.location.reload();
		}
	}

	useEffect(() => {
		fetchUser();
	}, []);

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
				updateSettings={updateSettings}
				// Goals
				setGoal={setGoal}
				setShowGoals={setShowGoals}
				goal={goal}
				showGoals={showGoals}
				filteredGoals={filteredGoals}
				// Age
				age={age}
				setAge={setAge}
				ageOptions={ageOptions}
			/>
		</div>
	);
}

export default SettingsPresenter;
