import React from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import Exercise from "../../interfaces/Exercise";
import { setFips } from "crypto";

interface SearchbarViewProps {
	selectedPart: string;
	setSelectedPart: (part: string) => void;
	bodyPart: { part: string; apiCall: string }[];
	exercise_results: Exercise[];
	setExercisesShown: (num: number) => void;
	exercisesShown: number;
	equipmentList: { equipment: string; apiCall: string }[];
	equipments: string;
	setEquipments: (equipment: string) => void;
	filterbyEquipment: boolean;
	setFilterbyEquipment: (equipment: boolean) => void;
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
}: SearchbarViewProps) {
	return (
		<div>
			<div className="flex flex-1">
				<div className="flex flex-row">
					<div className="w-fit">
						<div className="mb-5">
							<input type="text" placeholder="Type Workout here" />
						</div>
						<div className="flex">
							<Menu>
								<div className="flex flex-row">
									<div className="flex flex-col mr-5">
										<Menu.Button className="flex flex-row bg-lime-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200">
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
														className="flex flex-1 bg-yellow-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200 border -border-solid border-black"
														onClick={() => {
															setSelectedPart(bodyArea.apiCall);
															// Increment the number of exercises shown by 10
															setExercisesShown(1000);
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

									{/* Add the equipment menu here */}
									<Menu>
										<div className="flex flex-col">
											<Menu.Button className="flex flex-row bg-lime-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200">
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
															className="flex flex-1 bg-yellow-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200 border -border-solid border-black"
															onClick={() => {
																setEquipments(equipment.apiCall);
																console.log("Equipment: ", equipment.apiCall);
																setFilterbyEquipment(true);
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
			<div>
				{exercise_results.length > 0 ? (
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
									// If filterbyEquipment is false, filter only by body part
									return exercise.bodyPart === selectedPart;
								}
							})
							.map((exercise) => (
								<div key={exercise.id} className="flex w-32">
									<div className="flex flex-row my-6 border border-red-300 bg-slate-100 ">
										<div>{exercise.name}</div>
										<div>
											<img src={exercise.gifUrl} alt={exercise.name} />
										</div>
									</div>
								</div>
							))}
						<button
							className="bg-lime-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200"
							onClick={() => (
								setExercisesShown(exercisesShown + 1000),
								console.log(exercisesShown)
							)}
						>
							Load more exercises
						</button>
					</>
				) : (
					<p>No exercises to display.</p>
				)}
			</div>
		</div>
	);
}
