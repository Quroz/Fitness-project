import React from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Exercise from "../../interfaces/Exercise";
import { useNavigate } from "react-router-dom";
import LoadingComp from "../../components/Loading";

interface SearchbarViewProps {
  // Searching for body part
  selectedPart: string;
  setSelectedPart: (part: string) => void;
  bodyPart: { part: string; apiCall: string }[];

  // Searching for exercise by name
  exercise_results: Exercise[];
  setExercisesShown: (num: number) => void;
  exercisesShown: number;
  // Searching and filtering by equipment
  equipmentList: { equipment: string; apiCall: string }[];
  equipments: string;
  setEquipments: (equipment: string) => void;
  filterbyEquipment: boolean;
  setFilterbyEquipment: (equipment: boolean) => void;

  // Searching for exercise by name
  searchExercise: string;
  setSearchExercise: (exercise: string) => void;
  searchByName: number;
  setSearchByName: (search: number) => void;

  // Navigating to instructions page
  goToInstructionsPage: (exercise: Exercise) => void;

  // Loading spinner
  showLoading: boolean;
  setShowLoading: (loading: boolean) => void;
}

export default function SearchbarView({
  selectedPart,
  setSelectedPart,
  bodyPart,
  exercise_results,
  setExercisesShown,
  exercisesShown,
  equipments,
  equipmentList,
  setEquipments,
  filterbyEquipment,
  setFilterbyEquipment,
  searchExercise,
  setSearchExercise,
  searchByName,
  setSearchByName,
  goToInstructionsPage,
  showLoading,
  setShowLoading,
}: SearchbarViewProps) {
  return (
    <div className="flex flex-col items-center h-4/5">
      <div className="mt-5 flex h-fit">
        <div className="flex divide-x">
          <input
            className="rounded-l-lg px-2"
            type="text"
            placeholder={"Search for an exercise"}
            value={searchExercise}
            onKeyDown = {(e)=> {
              if(e.key === "Enter"){                
                setSearchByName(searchByName + 1);
                setExercisesShown(1000);
                setShowLoading(true);
              }
            }}
            onChange={(e) => {
              setSearchExercise(e.target.value);
            }}
          />

          <button
            className=" p-1  bg-white rounded-r-lg border-gray-200  cursor-pointer"
            onClick={() => {
              setSearchByName(searchByName + 1);
              setExercisesShown(100);
              setShowLoading(true);
            }}
            disabled={searchExercise === ""}
          >
            <MagnifyingGlassIcon
              className="w-7 h-7 mr-1 text-blue-200 hover:text-blue-100"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="flex">
          <Menu as="div" className="relative inline-block text-left ml-5">
            <div>
              <Menu.Button
              className={`inline-flex w-full justify-center rounded-md bg-black  px-4 py-2 text-sm font-medium  hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
                searchExercise !== ""
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-lime-300 hover:bg-lime-200"
              }`}
                disabled={searchExercise !== ""}
              >
                {selectedPart}
                <ChevronDownIcon
                  className="w-5 h-5 ml-2 -mr-1 text-blue-200 hover:text-blue-100"
                  aria-hidden="true"
                />
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {bodyPart.map((bodyArea) => (
                  <Menu.Item key={bodyArea.part}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-lime-300 text-white" : "text-gray-900 "
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => {
                          setSelectedPart(bodyArea.apiCall);
                          // Increment the number of exercises shown by 10
                          setExercisesShown(100);
                          setShowLoading(true);
                        }}
                      >
                        {bodyArea.part}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </div>
          </Menu>
          <Menu as="div" className="relative inline-block text-left ml-5">
            <div>
              <Menu.Button
              className={`inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium  hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
                searchExercise !== ""
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-lime-300 hover:bg-lime-200"
              }`}                disabled={searchExercise !== ""}
              >
                {equipments}
                <ChevronDownIcon
                  className="w-5 h-5 ml-2 -mr-1 text-blue-200 hover:text-blue-100"
                  aria-hidden="true"
                />
                
              </Menu.Button>
              <Menu.Items className="h-96 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-scroll">
                <div className="px-1 py-1 ">
                {equipmentList.map((equipment) => (
                  <Menu.Item key={equipment.equipment}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-lime-300 text-white" : "text-gray-900 "
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => {
                          const selectedEquipment =
                            equipment.apiCall === "No Filter"
                              ? ""
                              : equipment.apiCall;
                          setEquipments(selectedEquipment);
                          setFilterbyEquipment(selectedEquipment !== "");
                        }}
                      >
                        {equipment.equipment}
                      </button>
                    )}
                  </Menu.Item>
                ))}
                </div>
              </Menu.Items>
            </div>
          </Menu>
        </div>
      </div>
      <div className="flex justify-center flex-wrap h-4/5 w-4/5 mt-10 overflow-y-scroll">
        {showLoading ? (
          (console.log("Loading"), (<LoadingComp loading={showLoading} />))
        ) : exercise_results.length > 0 ? (
          <>
            {exercise_results
              .filter((exercise) => {
                if (filterbyEquipment) {
                  // If filterbyEquipment is true, filter by both equipment and body part

                  return (
                    exercise.bodyPart === selectedPart &&
                    exercise.equipment === equipments
                  );
                } else {
                  // If filterbyEquipment is false, then check if bodypart is selected. If not then search by name
                  if (selectedPart === "Select a body part") {
                    return exercise.name.includes(searchExercise.toLowerCase());
                  } else {
                    return exercise.bodyPart === selectedPart;
                  }
                }
              })
              .map((exercise) => (
                <div key={exercise.id} className="flex w-[14rem]">
                  <div className="flex items-center my-6 border border-red-300">
                    <div className="ml-1">{exercise.name}</div>
                    <div
                      onClick={() => {
                        goToInstructionsPage(exercise);
                      }}
                    >
                      <img src={exercise.gifUrl} alt={exercise.name} />
                    </div>
                  </div>
                </div>
              ))}
            <button
              className="py-2 text-sm rounded-sm bg-lime-300 w-15 hover:bg-lime-200"
              onClick={() => setExercisesShown(exercisesShown + 50)}
            >
              Load more exercises
            </button>
          </>
        ) : (
          <div className="my-5 text-center">
            <p>No exercises to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}
