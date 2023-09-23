import React, { useState, useEffect } from "react";
import SearchbarView from "../pages/Explore/SearchbarView";
import PlanDnD from "../pages/Explore/PlanDnD";
import Exercise_api from "../models/apimodel";

function ExplorePresenter() {
	const api_exercise = Exercise_api;
	const { exercise_part } = api_exercise;

	const [searchResults, setSearchResults] = useState([]);
	const [selectedPart, setSelectedPart] = useState("Select a body part");
	
	useEffect(() => {
		if (selectedPart !== "Select a body part") {
			// Fetch exercise data when the selected part changes and is not the initial value
			exercise_part(selectedPart, 10)
				.then((data) => {
					setSearchResults(data);
				})
				.catch((error) => {
					console.error("Error fetching exercise data:", error);
				});
		}
	}, [selectedPart]);

	return (
		<div className="flex my-4">
			<div className="flex flex-1">
				<div className="flex mx-2 mr-10 ">
					<SearchbarView
						selectedPart={selectedPart}
						setSelectedPart={setSelectedPart}
						results={searchResults}
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
