import React from "react";
import { Menu } from "@headlessui/react";

import Exercise_api from "../../models/apimodel";

interface SearchbarViewProps {
	selectedPart: string;
	setSelectedPart: (part: string) => void;
	bodyPart: { part: string; apiCall: string }[]; // Add bodyPart prop
}

export default function SearchbarView({
	selectedPart,
	setSelectedPart,
	bodyPart,
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
										setSelectedPart(bodyArea.part);
										Exercise_api.exercise_part(bodyArea.apiCall, 10).then(
											(data) => console.log(data)
										);
									}}
									/** Call the function exercise_name and console.log it  */
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
				{" Create"}
			</div>
		</div>
	);
}
