import React, { useState, useEffect } from "react";
import SearchbarView from "../pages/Explore/SearchbarView";
import PlanDnD from "../pages/Explore/PlanDnD";

function ExplorePresenter() {
	const [searchResults, setSearchResults] = useState([]);
	const [selectedPart, setSelectedPart] = useState("Select a body part");


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
