/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import {APIController} from "../models/apimodel";
import Exercise from "../interfaces/Exercise";
import bodyPart from "../interfaces/Bodypart";
import EquipmentList from "../interfaces/Equipment";
import { useNavigate } from "react-router-dom";
import LoadingComp from "../components/Loading";

// Lazy-loaded components
const SearchbarView = lazy(() => import("../pages/Explore/SearchbarView"));

function ExplorePresenter() {
  const [selectedPart, setSelectedPart] = useState("Select a body part");
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
  const [filterData, setFilterData] = useState<Exercise[]>([]);
  const [exercisesShown, setExercisesShown] = useState(0);
  const [equipments, setEquipments] = useState("Select an equipment");
  const [searchExercise, setSearchExercise] = useState("");
  const [searchByName, setSearchByName] = useState(1);
  const [showLoading, setShowLoading] = useState(false);
  const [numberOfEx, setNumberOfEx] = useState(10);
  const [clicked, setClicked] = useState(false);

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
      APIController.exercise_name(searchExercise, exercisesShown)
        .then((data) => {
          setExerciseData(data)
          setFilterData(data);
        })
        .finally(() => {
          setShowLoading(false);
        });
    }

    if (selectedPart === "Select a body part") return;
    APIController.exercise_part(selectedPart, exercisesShown)
      .then((data) => {
        setShowLoading(true);
        setExerciseData(data);
        setFilterData(data);
      })
      .finally(() => {
        setShowLoading(false);
      });
  }, [exercisesShown, selectedPart, searchByName]);

  function filterResults(selectedEquipment:string, filter:boolean) {
    let newArray = exerciseData.filter((exercise) => {
      if (filter) {
        // If filterbyEquipment is true, filter by both equipment and body part
        return (
          exercise.bodyPart === selectedPart &&
          exercise.equipment === selectedEquipment
        );
      } else {
        // If filterbyEquipment is false, then check if bodypart is selected. If not then search by name
        if (selectedPart === "Select a body part") {
          return exercise.name.includes(searchExercise.toLowerCase());
        } else {
          return exercise.bodyPart === selectedPart;
        }
      }
    });
    setFilterData(newArray);
  }

  return (
    <div>
      <Suspense fallback={<div> <LoadingComp loading={true}/> </div>}>
        <SearchbarView
          bodyPart={bodyPart}
          selectedPart={selectedPart}
          setSelectedPart={setSelectedPart}
          exercise_results={filterData}
          setExercisesShown={setExercisesShown}
          exercisesShown={exercisesShown}
          equipments={equipments}
          equipmentList={EquipmentList}
          setEquipments={setEquipments}
          searchExercise={searchExercise}
          setSearchExercise={setSearchExercise}
          searchByName={searchByName}
          setSearchByName={setSearchByName}
          goToInstructionsPage={gotoInstructionsPage}
          showLoading={showLoading}
          setShowLoading={setShowLoading}
          numberOfEx={numberOfEx}
          setNumberOfEx={setNumberOfEx}
          filterResults={filterResults}
          clicked={clicked}
          setClicked={setClicked}

        />
      </Suspense>
    </div>
  );
}

export default ExplorePresenter;
