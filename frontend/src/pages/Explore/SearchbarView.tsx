import React from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import Exercise from "../../interfaces/Exercise";

interface SearchbarViewProps {
	selectedPart: string;
	setSelectedPart: (part: string) => void;
	bodyPart: { part: string; apiCall: string }[];
	exercise_results: Exercise[];
	setExercisesShown: (num: number) => void;
	exercisesShown: number;
	equipments: string;
	equipmentList : { equipment: string; apiCall: string }[];
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
}: SearchbarViewProps) {
	return (
		<div>
			<div className="flex flex-1">
				<div className="flex flex-row">
					<div className="w-28">
						<div className="mb-5">
							<input type="text" placeholder="Type Workout here" />
						</div>
						<Menu>
							<div className="flex flex-row">
								<Menu.Button className="flex flex-row bg-lime-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200">
									<ChevronDownIcon
										className="w-5 h-5 ml-2 -mr-1 text-blue-200 hover:text-blue-100"
										aria-hidden="true"
									/>
									{selectedPart}
								</Menu.Button>
								<Menu>
									<Menu.Button className="flex flex-row bg-lime-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200">
										<ChevronDownIcon
											className="w-5 h-5 ml-2 -mr-1 text-blue-200 hover:text-blue-100"
											aria-hidden="true"
										/>
										{equipments}
									</Menu.Button>
								</Menu>
							</div>
							<Menu.Items>
								{bodyPart.map((bodyArea) => (
									<Menu.Item key={bodyArea.part}>
										<button
											className="flex flex-1 bg-yellow-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200 border -border-solid border-black"
											onClick={() => {
												setSelectedPart(bodyArea.apiCall);
												// Inrement the number of exercises shown by 10
												setExercisesShown(10);
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
						</Menu>
					</div>
				</div>
			</div>
			<div>
				{exercise_results.length > 0 ? (
					<>
						{exercise_results.map((exercise) => (
							<div key={exercise.id} className="flex w-32">
								<div className="flex flex-row my-6 border border-red-300 bg-slate-100 ">
									<div>{exercise.name}</div>
									<div>
										<img src={exercise.gifUrl} alt={exercise.name} />
									</div>
								</div>
							</div>
						))}
						{/* Add your button here, inside the condition */}
						<button
							className="bg-lime-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200"
							onClick={() => (
								setExercisesShown(exercisesShown + 10),
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
