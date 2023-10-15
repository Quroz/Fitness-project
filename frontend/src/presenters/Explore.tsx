// ExplorePresenter.tsx
import React, { useState, useEffect } from "react";
import SearchbarView from "../pages/Explore/SearchbarView";
import InstructionsPage from "../pages/Explore/InstructionsView";
import Exercise_api from "../models/apimodel";
import Exercise from "../interfaces/Exercise";
import bodyPart from "../interfaces/Bodypart";
import EquipmentList from "../interfaces/Equipment";
import { useNavigate } from "react-router-dom";

function ExplorePresenter() {
  // Related to body part filter or search
  const [selectedPart, setSelectedPart] = useState("Select a body part");
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);

  // Related to how many exercises are shown
  const [exercisesShown, setExercisesShown] = useState(0);

  // Related to equipment filter
  const [equipments, setEquipments] = useState("Select an equipment");
  const [filterbyEquipment, setFilterbyEquipment] = useState(false);

  // Related to searching exercise by name
  const [searchExercise, setSearchExercise] = useState("");
  const [searchByName, setSearchByName] = useState(1);

  const [showLoading, setShowLoading] = useState(false);

  // Related to navigating to instructions page
  const navigate = useNavigate();

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

  function gotoInstructionsPage(exercise: Exercise) {
    const data = { exercise: exercise };
    const queryParam = encodeURIComponent(JSON.stringify(data));
    navigate(`/instructions?data=${queryParam}`);
  }

  

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 first-letter">
      <div className="w-full py-1 mt-8">
        <h1 className="text-5xl text-center">Explore Page</h1>
      </div>
      <SearchbarView
        // Related to filtering and searching by body part
        bodyPart={bodyPart}
        selectedPart={selectedPart}
        setSelectedPart={setSelectedPart}
        exercise_results={exerciseData}
        // Related to how many exercises are shown
        setExercisesShown={setExercisesShown}
        exercisesShown={exercisesShown}
        // Related to filtering by equipment
        equipments={equipments}
        equipmentList={EquipmentList}
        setEquipments={setEquipments}
        filterbyEquipment={filterbyEquipment}
        setFilterbyEquipment={setFilterbyEquipment}
        // Related to searching exercise by name
        searchExercise={searchExercise}
        setSearchExercise={setSearchExercise}
        searchByName={searchByName}
        setSearchByName={setSearchByName}
        // Related to navigating to instructions page
        goToInstructionsPage={gotoInstructionsPage}
        showLoading={showLoading}
        setShowLoading={setShowLoading}
      />
    </div>
  );
}

export default ExplorePresenter;
