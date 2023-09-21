import React from "react";
import SearchbarView from "../pages/Explore/SearchbarView";
import PlanDnD from "../pages/Explore/PlanDnD";

function ExplorePresenter() {
	return (
		<div className="flex">
			<div className="flex flex-1">
				<div className="flex mx-2 mr-10">
					<SearchbarView />
				</div>
				<PlanDnD />
			</div>
		</div>
	);
}

export default ExplorePresenter;
