import React from "react";
import { Menu } from "@headlessui/react";

import Exercise_api from "../../models/apimodel";

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

interface SearchbarViewProps {
	selectedPart: string;
	setSelectedPart: (part: string) => void;
	bodyPart: { part: string; apiCall: string }[];
	exercise_results: Exercise[];
	showExercise: boolean;
}

export default function SearchbarView({
	selectedPart,
	setSelectedPart,
	bodyPart,
	exercise_results,
	showExercise,
}: SearchbarViewProps) {
	return (
		<div>
			<div className="border border-solid">
				<Menu>
					<div className="flex w-30 bg-slate-700">
						<Menu.Button className="w-fit ">{selectedPart}</Menu.Button>
					</div>
					<Menu.Items>
						{bodyPart.map((bodyArea) => (
							<Menu.Item key={bodyArea.part}>
								<button
									className="flex flex-1"
									onClick={() => {
										setSelectedPart(bodyArea.apiCall);
										Exercise_api.exercise_part(bodyArea.apiCall, 10).then(
											(data) => console.log(data)
										);
									}}
								>
									{bodyArea.part}
								</button>
							</Menu.Item>
						))}
					</Menu.Items>
				</Menu>
			</div>
			<div>
				<h1>Exercises</h1>
				{showExercise ? (
					exercise_results.length > 0 ? (
						exercise_results.map((exercise) => (
							<div key={exercise.id}>{exercise.name}</div>
						))
					) : (
						<p>No exercises to display.</p>
					)
				) : null}
			</div>
		</div>
	);
}
