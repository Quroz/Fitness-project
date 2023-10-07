import React, { useEffect, useState } from "react";
import AddWorkout from "./AddWorkout";
import AddPlan from "./AddPlan";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";
import EditWorkout from "./EditWorkout";

type Props = {
	id: number;
	day: string;
	name: string;
	type: string;
};

const MyWorkouts = () => {
	const [addWorkout, setAddWorkout] = useState(false);
	const [addPlan, setAddPlan] = useState(false);
	const [edit, setEdit] = useState(false);
	const [search, setSearch] = useState("");

	const [filteredArray, setFilteredArray] = useState<Props[]>([]);

	const [myPlan, setMyPlan] = useState<Props[]>([]);

	const navigate = useNavigate();

	const userJSON = localStorage.getItem("userFittness");
	const user = userJSON ? JSON.parse(userJSON) : null;

	console.log("fas", user);

	function itemPage(item: any) {
		const id = { id: item.id };
		const queryParam = encodeURIComponent(JSON.stringify(id));
		navigate(`/itemPage?data=${queryParam}`);
	}

	function deleteHandler(id: any) {
		console.log("id delete", id);

		const updatedData = myPlan.filter((item) => item.id !== id);

		setMyPlan(updatedData);
		console.log("updatedData", updatedData);
		localStorage.setItem("myPlan", JSON.stringify(updatedData));
	}

	async function deleteWorkoutPlan(id: number) {
		const response = await fetch(
			"http://localhost:4000/api/workout/deleteAllWorkouts",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					plan_id: id,
				}),
			}
		);
		const data = await response.json();
		if (response.status !== 200) {
			alert("Could not delete workout plan");
		} else {
			alert("Deleted!");

			const updatedData = myPlan.filter((item) => item.id !== id);
			console.log("updatedData", updatedData);
			setMyPlan(updatedData);
			setFilteredArray(updatedData);

			localStorage.setItem(user.email, JSON.stringify(updatedData));
		}
	}

	console.log(filteredArray);

	useEffect(() => {
		if (search !== "") {
			const filteredResult = myPlan.filter((item) => item.name === search);
			setFilteredArray(filteredResult);
		} else {
			const localStorageData = localStorage.getItem(user.email);
			if (localStorageData) {
				const parsedData = JSON.parse(localStorageData);
				setMyPlan(parsedData);
				setFilteredArray(parsedData);
			}
		}
	}, [search, myPlan]);

	async function checkHandler(id: number) {
		const response = await fetch("http://localhost:4000/api/user/updateCheck", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
			body: JSON.stringify({
				check: [new Date().toISOString().slice(0, 10)],
				email: user.email,
			}),
		});

		try {
			if (response.status !== 200) {
				alert("Could not check workout");
			} else {
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="mt-24 w-[80%] mx-auto">
			<div className="flex items-center justify-between">
				<h1>{filteredArray.length} Workouts</h1>
				<h1>Sort by Workout Name: A-Z</h1>
				<div className="flex items-center gap-2">
					<input
						className="bg-white border-[1px] border-gray-300 indent-1 rounded-sm py-2 w-[250px] text-black"
						placeholder="Search workout by name"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button
						className="bg-lime-300  rounded-sm py-2 w-[100px] text-sm hover:bg-lime-200"
						onClick={() => setAddPlan(true)}
					>
						Add
					</button>
				</div>
			</div>
			<div className="flex flex-col w-full gap-4 my-8 overflow-y-auto">
				{filteredArray.map((item: any) => (
					<div className="flex items-center justify-around max-w-full py-4 bg-white border-[1px] border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 relative">
						<div
							className="absolute left-2 top-1 border-[1px] border-black w-4 h-4 bg-green-500"
							onClick={() => checkHandler(item.plan_id)}
						/>
						<h1>
							<strong>Day:</strong> {item.day}
						</h1>
						<h1>
							<strong>Name:</strong> {item.name}
						</h1>
						<h1>
							<strong>Type:</strong> {item.type}
						</h1>
						<div className="absolute flex items-center gap-4 top-4 right-2">
							<AiOutlineArrowRight
								size={24}
								color="green"
								onClick={() => itemPage(item)}
							/>
							<AiOutlineClose
								className="cursor-pointer"
								color="red"
								size={24}
								onClick={() => deleteWorkoutPlan(item.id)}
							/>
						</div>
					</div>
				))}
			</div>
			{addPlan && (
				<div
					className={
						addPlan
							? "bottom-0 left-0 right-0 top-[30%] m-auto absolute z-20 w-[400px] duration-500 ease-in"
							: "left-0 top-[-100%] absolute z-20 h-[400px] w-[400px]"
					}
				>
					<AddPlan
						setAddPlan={setAddPlan}
						myPlan={myPlan}
						setMyPlan={setMyPlan}
					/>
				</div>
			)}
		</div>
	);
};

export default MyWorkouts;
