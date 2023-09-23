import React from "react";
import { useState } from "react";
import { Menu } from "@headlessui/react";

/*Required parameters from the API  */
const bodyPart = [
	{ part: "Back" },
	{ part: "Cardio" },
	{ part: "Chest" },
	{ part: "Lower Arms" },
	{ part: "Lower Legs" },
	{ part: "Neck" },
	{ part: "Shoulders" },
	{ part: "Upper Arms" },
];

interface SearchbarViewProps {
	exerciseApi: {
		exercises_call(limit: number): Promise<any>;
		exercise_name(name: string, limit: number): Promise<any>;
		exercise_id(id_number: number): Promise<any>;
	};
}

/*
  Search bar component where the user can search to train a specific body part
  This will be used for the APi to search for the specific body part and return the exercises

 */
export default function SearchbarView({ exerciseApi }: SearchbarViewProps) {
	const [part, setPart] = useState(bodyPart[0]);
	const [notSelected, setSelected] = useState("Select Body Part");

	return (
		<div>

			<div className="border border-solid">
				<Menu>
					<div className="flex w-30 bg-slate-700">
						<Menu.Button className="w-fit ">{notSelected}</Menu.Button>
					</div>
					<Menu.Items>
						{bodyPart.map((part) => (
							<Menu.Item>
								<button
									className="flex flex-1"
									onClick={() => {
										setSelected(part.part);
									}}
								>
									{part.part}
								</button>
							</Menu.Item>
						))}
					</Menu.Items>
				</Menu>
			</div>
			<div>
				{"Use the exercise APi and make API calls. Console log it "}
			</div>
		</div>
	);
}
