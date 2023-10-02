// ExplorePresenter.tsx
import React, { useState, useEffect } from "react";
import SearchbarView from "../pages/Explore/SearchbarView";
import PlanDnD from "../pages/Explore/PlanDnD";
import Exercise_api from "../models/apimodel";
import Exercise from "../interfaces/Exercise";
import bodyPart from "../interfaces/Bodypart";
import EquipmentList from "../interfaces/Equipment";


function ExplorePresenter() {
	// Related to body part filter or search
	const [selectedPart, setSelectedPart] = useState("Select a body part");
	const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
	// Related to how many exercises are shown
	const [exercisesShown, setExercisesShown] = useState(0);
	// Related to equipment filter
	const [equipments, setEquipments] = useState("Select an equipment");
	const [filterbyEquipment, setFilterbyEquipment] = useState(false);
	

	useEffect(() => {
		if (selectedPart === "Select a body part") return;

		Exercise_api.exercise_part(selectedPart, exercisesShown).then((data) => {
			setExerciseData(data);
		});
	}, [exercisesShown, selectedPart]);

	return (
		<div className="flex my-4">
			<div className="flex flex-1">
				<div className="flex mx-5 mr-20">
					<SearchbarView
						bodyPart={bodyPart}
						selectedPart={selectedPart}
						setSelectedPart={setSelectedPart}
						exercise_results={exerciseData}
						setExercisesShown={setExercisesShown}
						exercisesShown={exercisesShown}
						equipments={equipments}
						equipmentList={EquipmentList}
						setEquipments={setEquipments}
						filterbyEquipment = {filterbyEquipment}
						setFilterbyEquipment = {setFilterbyEquipment}
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
