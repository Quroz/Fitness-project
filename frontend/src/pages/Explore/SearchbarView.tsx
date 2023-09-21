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

/*
  Search bar component where the user can search to train a specific body part
  This will be used for the APi to search for the specific body part and return the exercises

 */
export default function SearchbarView() {
	const [part, setPart] = useState(bodyPart[0]);

	return (
		<div className="border border-solid">
			<Menu>
				<Menu.Button className="flex bg-slate-700">
					Select Body Part
				</Menu.Button>
				<Menu.Items>
					{bodyPart.map((part) => (
						<Menu.Item>
							<button  className="flex flex-1" onClick={() => setPart(part)}>
								{part.part}
							</button>
						</Menu.Item>
					))}
				</Menu.Items>
			</Menu>
		</div>
	);
}
