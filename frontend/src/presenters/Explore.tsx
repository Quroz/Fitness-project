import React, { useState, useEffect } from "react";
import SearchbarView from "../pages/Explore/SearchbarView";
import PlanDnD from "../pages/Explore/PlanDnD";

const bodyPart = [
	{ part: "Back", apiCall: "back" },
	{ part: "Cardio", apiCall: "cardio" },
	{ part: "Chest", apiCall: "chest" },
	{ part: "Lower Arms" , apiCall: "lower arms"},
	{ part: "Lower Legs", apiCall: "lower legs" },
	{ part: "Neck", apiCall: "neck" },
	{ part: "Shoulders", apiCall: "shoulders" },
	{ part: "Upper Arms" , apiCall: "upper arms"},
];

function ExplorePresenter() {
	
	const [searchResults, setSearchResults] = useState([]);
	const [selectedPart, setSelectedPart] = useState("Select a body part");

	


	return (
		<div className="flex my-4">
			<div className="flex flex-1">
				<div className="flex mx-2 mr-10 ">
					<SearchbarView
						bodyPart={bodyPart}
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
