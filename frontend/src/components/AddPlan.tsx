import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
	setAddPlan: any;
	myPlan: any;
	setMyPlan: any;
};

const AddPlan = ({ myPlan, setAddPlan, setMyPlan }: Props) => {
	const [day, setDay] = useState("");
	const [name, setName] = useState("");
	const [type, setType] = useState("");

	const userJSON = localStorage.getItem("userFittness");
	const user = userJSON ? JSON.parse(userJSON) : null;

	function addHandler() {
		setMyPlan([
			...myPlan,
			{ id: Date.now(), day: day, name: name, type: type },
		]);
		localStorage.setItem(
			user.email,
			JSON.stringify([
				...myPlan,
				{ id: Date.now(), day: day, name: name, type: type },
			])
		);
		setAddPlan(false);
	}

	return (
		<div className="flex flex-col">
			<div className="relative flex items-center justify-center h-12 bg-lime-300 rounded-t-md">
				<AiOutlineClose
					className="absolute text-xl text-white cursor-pointer right-4"
					onClick={() => setAddPlan(false)}
				/>
				<h1 className="text-2xl text-white">Add Workout</h1>
			</div>
			<div className="flex flex-col flex-1 gap-4 p-4 bg-gray-100 rounded-b-md">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label className="text-lg">Day of the workout</label>
						<input
							type="text"
							placeholder="Day.."
							className="w-full py-1 bg-white rounded-md indent-1"
							onChange={(e) => setDay(e.target.value)}
							value={day}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-lg">Name of the workout</label>
						<input
							type="text"
							placeholder="Name.."
							className="w-full py-1 bg-white rounded-md indent-1"
							onChange={(e) => setName(e.target.value)}
							value={name}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-lg">Type of workout</label>
						<input
							type="text"
							placeholder="Type.."
							className="w-full py-1 bg-white rounded-md indent-1"
							onChange={(e) => setType(e.target.value)}
							value={type}
						/>
					</div>
				</div>
				<button
					className="px-2 py-2 mt-8 text-sm font-bold text-white rounded-md bg-lime-300 hover:bg-lime-200"
					onClick={addHandler}
				>
					Add
				</button>
			</div>
		</div>
	);
};

export default AddPlan;
