import React from "react";
//import Exercise from "../../interfaces/Exercise";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function InstructionsPage(): JSX.Element {
	const location = useLocation();
	const searchData = new URLSearchParams(location.search).get("data");

	const dataJSON = searchData
		? JSON.parse(decodeURIComponent(searchData))
		: null;

	const navigate = useNavigate()

	return (
		<div className="flex flex-col items-center justify-center h-screen p-4 relative">
			<div className="mb-4 text-center">
				<BsFillArrowLeftCircleFill className="absolute top-2 left-7 cursor-pointer" size = {24} onClick={() => navigate("/explore")}/>
				<h1 className="text-3xl font-bold">{dataJSON?.exercise.name}</h1>
			</div>
			<div className="mb-4">
				<img
					src={dataJSON?.exercise.gifUrl}
					alt={dataJSON?.exercise.name}
					className="max-w-full max-h-96"
				/>
			</div>
			<div className="text-left">
				<h2 className="mb-2 text-xl font-semibold">Exercise Details:</h2>
				<p>
					<strong>Body Part:</strong> {dataJSON?.exercise.bodyPart}
				</p>
				<p>
					<strong>Equipment:</strong> {dataJSON?.exercise.equipment}
				</p>
				<p>
					<strong>Target Muscles:</strong> {dataJSON?.exercise.target}
				</p>
				<p>
					<strong>Secondary Muscles:</strong>{" "}
					{dataJSON?.exercise.secondaryMuscles.join(", ")}
				</p>
				<h2 className="mt-4 mb-2 text-xl font-semibold">Instructions:</h2>
				<ul>
					{dataJSON?.exercise.instructions.map((instruction:string, index:number) => (
						<li key={index} className="ml-4 list-disc">
							{instruction}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default InstructionsPage;
