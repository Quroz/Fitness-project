import React, { useState, useEffect } from "react";
import SearchbarView from "../pages/Explore/SearchbarView";
import PlanDnD from "../pages/Explore/PlanDnD";
import Exercise_api from "../models/apimodel";

const bodyPart = [
	{ part: "Back" },
	{ part: "Cardio" },
	{ part: "Chest" },
	{ part: "Lower Arms" },
	{ part: "Lower Legs" },
	{ part: "Neck" },
	{ part: "Shoulders" },
	{ part: "Upper Arms" },
];

function ExplorePresenter() {
	const api_exercise = Exercise_api;
	const { exercise_part } = api_exercise;

	const [searchResults, setSearchResults] = useState([]);
	const [selectedPart, setSelectedPart] = useState("Select a body part");

	useEffect(() => {
		// Fetch exercise data when the selected part changes
		exercise_part(selectedPart, 10)
			.then((data) => {
				setSearchResults(data);
			})
			.catch((error) => {
				console.error("Error fetching exercise data:", error);
			});
	}, [selectedPart]);

	return (
		<div className="flex my-4">
			<div className="flex flex-1">
				<div className="flex mx-2 mr-10 ">
					<SearchbarView
						selectedPart={selectedPart}
						setSelectedPart={setSelectedPart}
					/>
				</div>
				<div className="flex">
					<PlanDnD />
				</div>
			</div>
		</div>
	);
}

export default ExplorePresenter;
