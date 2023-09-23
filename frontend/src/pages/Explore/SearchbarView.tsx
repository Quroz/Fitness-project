import React from "react";
import { Menu } from "@headlessui/react";

interface SearchbarViewProps {
	selectedPart: string; // Specify the type for selectedPart
	setSelectedPart: (part: string) => void; // Specify the type for setSelectedPart
}

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

export default function SearchbarView({
	selectedPart,
	setSelectedPart,
}: SearchbarViewProps) {
	const handlePartSelection = (part: string) => {
		setSelectedPart(part);
	};

	return (
		<div>
			<div className="border border-solid">
				<Menu>
					<div className="flex w-30 bg-slate-700">
						<Menu.Button className="w-fit ">{selectedPart}</Menu.Button>
					</div>
					<Menu.Items>
						{bodyPart.map((partItem) => (
							<Menu.Item key={partItem.part}>
								<button
									className="flex flex-1"
									onClick={() => handlePartSelection(partItem.part)}
								>
									{partItem.part}
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
