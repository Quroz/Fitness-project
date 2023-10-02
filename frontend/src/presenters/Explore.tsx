// ExplorePresenter.tsx
import React, { useState, useEffect } from "react";
import SearchbarView from "../pages/Explore/SearchbarView";
import PlanDnD from "../pages/Explore/PlanDnD";
import Exercise_api from "../models/apimodel";

const bodyPart = [
	{ part: "Back", apiCall: "back" },
	{ part: "Cardio", apiCall: "cardio" },
	{ part: "Chest", apiCall: "chest" },
	{ part: "Lower Arms", apiCall: "lower arms" },
	{ part: "Lower Legs", apiCall: "lower legs" },
	{ part: "Neck", apiCall: "neck" },
	{ part: "Shoulders", apiCall: "shoulders" },
	{ part: "Upper Arms", apiCall: "upper arms" },
];

interface Exercise {
	bodyPart: string;
	equipment: string;
	gifUrl: string;
	id: string;
	name: string;
	target: string;
	secondaryMuscles: string[];
	instructions: string[];
}

function ExplorePresenter() {
	const [selectedPart, setSelectedPart] = useState("Select a body part");
	const [exerciseData, setExerciseData] = useState<Exercise[]>([]);

	useEffect(() => {
		Exercise_api.exercise_part(selectedPart, 10).then((data) => {
			setExerciseData(data);
		});
	}, [selectedPart]);

	return (
		<div className="flex my-4">
			<div className="flex flex-1">
				<div className="flex mx-2 mr-10">
					<SearchbarView
						bodyPart={bodyPart}
						selectedPart={selectedPart}
						setSelectedPart={setSelectedPart}
						exercise_results={exerciseData}
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
