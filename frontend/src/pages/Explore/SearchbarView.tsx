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
}

export default function SearchbarView({
	selectedPart,
	setSelectedPart,
	bodyPart,
	exercise_results,
}: SearchbarViewProps) {
	return (
		<div>
			<div className="flex flex-1">
				<div className="w-28 bg-slate-700">
					<Menu>
						<div>
							<Menu.Button className="w-20 ">{selectedPart}</Menu.Button>
						</div>
						<Menu.Items>
							{bodyPart.map((bodyArea) => (
								<Menu.Item key={bodyArea.part}>
									<button
										className="flex flex-1"
										onClick={() => {
											setSelectedPart(bodyArea.apiCall);
										}}
									>
										{bodyArea.part}
									</button>
								</Menu.Item>
							))}
						</Menu.Items>
					</Menu>
				</div>
			</div>
			<div>
				<h1>Exercises</h1>
				{exercise_results.length > 0 ? (
					exercise_results.map((exercise) => (
						<div key={exercise.id}>
							{exercise.name}
							<img src={exercise.gifUrl} alt={exercise.name} />
						</div>
					))
				) : (
					<p>No exercises to display.</p>
				)}
			</div>
		</div>
	);
}
