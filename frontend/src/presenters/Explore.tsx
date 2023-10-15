import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import Exercise_api from "../models/apimodel";
import Exercise from "../interfaces/Exercise";
import bodyPart from "../interfaces/Bodypart";
import EquipmentList from "../interfaces/Equipment";
import { useNavigate } from "react-router-dom";

// Lazy-loaded components
const SearchbarView = lazy(() => import("../pages/Explore/SearchbarView"));
const InstructionsPage = lazy(
	() => import("../pages/Explore/InstructionsView")
);

function ExplorePresenter() {
	const [selectedPart, setSelectedPart] = useState("Select a body part");
	const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
	const [exercisesShown, setExercisesShown] = useState(0);
	const [equipments, setEquipments] = useState("Select an equipment");
	const [filterbyEquipment, setFilterbyEquipment] = useState(false);
	const [searchExercise, setSearchExercise] = useState("");
	const [searchByName, setSearchByName] = useState(1);
	const [showLoading, setShowLoading] = useState(false);

	const navigate = useNavigate();

	// Memoize the function to avoid recreating it on each render
	const gotoInstructionsPage = useMemo(
		() => (exercise: Exercise) => {
			const data = { exercise: exercise };
			const queryParam = encodeURIComponent(JSON.stringify(data));
			navigate(`/instructions?data=${queryParam}`);
		},
		[navigate]
	);

	useEffect(() => {
		if (searchExercise !== "") {
			setShowLoading(true);
			Exercise_api.exercise_name(searchExercise, exercisesShown)
				.then((data) => setExerciseData(data))
				.finally(() => {
					setShowLoading(false);
				});
		}

		if (selectedPart === "Select a body part") return;
		Exercise_api.exercise_part(selectedPart, exercisesShown)
			.then((data) => {
				setShowLoading(true);
				setExerciseData(data);
			})
			.finally(() => {
				setShowLoading(false);
			});
	}, [exercisesShown, selectedPart, searchByName]);

	return (
		<div className="flex flex-col w-full h-screen bg-gray-100 first-letter">
			<div className="w-full py-1 mt-8">
				<h1 className="text-5xl text-center">Explore Page</h1>
			</div>
			<Suspense fallback={<div>Loading...</div>}>
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
					filterbyEquipment={filterbyEquipment}
					setFilterbyEquipment={setFilterbyEquipment}
					searchExercise={searchExercise}
					setSearchExercise={setSearchExercise}
					searchByName={searchByName}
					setSearchByName={setSearchByName}
					goToInstructionsPage={gotoInstructionsPage}
					showLoading={showLoading}
					setShowLoading={setShowLoading}
				/>
			</Suspense>
		</div>
	);
}

export default ExplorePresenter;
