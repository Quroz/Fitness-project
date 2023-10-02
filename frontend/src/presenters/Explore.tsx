// ExplorePresenter.tsx
import React, { useState, useEffect } from "react";
import SearchbarView from "../pages/Explore/SearchbarView";
import PlanDnD from "../pages/Explore/PlanDnD";
import Exercise_api from "../models/apimodel";
import Exercise from "../interfaces/Exercise";
import bodyPart from "../interfaces/Bodypart";

function ExplorePresenter() {
	const [selectedPart, setSelectedPart] = useState("Select a body part");
	const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
	const [exercisesShown, setExercisesShown] = useState(0);

	useEffect(() => {
		if (selectedPart === "Select a body part") return;

		Exercise_api.exercise_part(selectedPart, exercisesShown).then((data) => {
			setExerciseData(data);
		});
	}, [exercisesShown, selectedPart]);

	return (
		<div className="flex my-4">
			<div className="flex flex-1">
				<div className="flex mx-10 mr-10">
					<SearchbarView
						bodyPart={bodyPart}
						selectedPart={selectedPart}
						setSelectedPart={setSelectedPart}
						exercise_results={exerciseData}
						setExercisesShown={setExercisesShown}
						exercisesShown={exercisesShown}
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
