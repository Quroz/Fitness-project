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
		<div className="mt-16 overflow-y-scroll">
	
			<div className="flex flex-1 ">
				<div className="flex flex-row  w-fit ">
					<div className="w-fit">
						<div className="mb-5">
							<div className="flex flex-row justify-between gap-2">
								<input
									type="text"
									placeholder={"Search for an exercise"}
									value={searchExercise}
									onChange={(e) => {
										setSearchExercise(e.target.value);
									}}
								/>

								<div className="flex items-center border-[1px] border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
									<button
										className="w-full h-full p-1 rounded-md text-gray-400 cursor-pointer"
										onClick={() => {
											setSearchByName(searchByName + 1);
											setExercisesShown(1000);
											setShowLoading(true);
										}}
										disabled={searchExercise === ""}
									>
										Enter
									</button>
									<MagnifyingGlassIcon
											className="w-7 h-7 ml-2 mr-1 text-blue-200 hover:text-blue-100"
											aria-hidden="true"
									/>
								</div>
							</div>
						</div>
						<div className="flex">
							<Menu>
								<div className="flex flex-row">
									<div className="flex flex-col mr-5">
										<Menu.Button
											className={`flex flex-row py-2 text-sm rounded-sm w-15 ${
												searchExercise !== ""
													? "bg-gray-300 cursor-not-allowed"
													: "bg-lime-300 hover:bg-lime-200"
											}`}
											disabled={searchExercise !== ""}
										>
											<ChevronDownIcon
												className="w-5 h-5 ml-2 -mr-1 text-blue-200 hover:text-blue-100"
												aria-hidden="true"
											/>
											{selectedPart}
										</Menu.Button>

										<Menu.Items>
											{bodyPart.map((bodyArea) => (
												<Menu.Item key={bodyArea.part}>
													<button
														className="flex flex-1 py-2 text-sm bg-yellow-300 border border-black rounded-sm w-15 hover:bg-lime-200 -border-solid"
														onClick={() => {
															setSelectedPart(bodyArea.apiCall);
															// Increment the number of exercises shown by 10
															setExercisesShown(1000);
															setShowLoading(true);
														}}
													>
														{bodyArea.part}
														<ChevronDownIcon
															className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
															aria-hidden="true"
														/>
													</button>
												</Menu.Item>
											))}
										</Menu.Items>
									</div>
									<Menu>
										<div className="flex flex-col">
											<Menu.Button
												className={`flex flex-row py-2 text-sm rounded-sm ${
													searchExercise !== ""
														? "bg-gray-300 cursor-not-allowed"
														: "bg-lime-300 hover:bg-lime-200"
												}`}
												disabled={searchExercise !== ""}
											>
												<ChevronDownIcon
													className="w-5 h-5 ml-2 -mr-1 text-blue-200 hover:text-blue-100"
													aria-hidden="true"
												/>
												{equipments}
											</Menu.Button>
											<Menu.Items>
												{equipmentList.map((equipment) => (
													<Menu.Item key={equipment.equipment}>
														<button
															className={`flex flex-1 bg-yellow-300 rounded-sm py-2 w-20 text-sm hover:bg-lime-200 border -border-solid border-black ${
																equipments === equipment.apiCall
																	? "bg-green-300"
																	: ""
															}`}
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
															<ChevronDownIcon
																className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
																aria-hidden="true"
															/>
														</button>
													</Menu.Item>
												))}
											</Menu.Items>
										</div>
									</Menu>
								</div>
							</Menu>
						</div>
					</div>
				</div>
			</div>
			<div className= "flex flex-col">
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
										return exercise.name.includes(searchExercise);
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
											<img src={exercise.gifUrl} alt={exercise.name}/>
										</div>
									</div>
								</div>
							))}
						<button
							className="py-2 text-sm rounded-sm bg-lime-300 w-15 hover:bg-lime-200"
							onClick={() => setExercisesShown(exercisesShown + 1000)}
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
