import React, { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutDay from "../interfaces/WorkoutDay";
import AddPlan from "../components/Workout/AddPlanPopup";

const LazyChooseView = lazy(() => import("../pages/Workout/ChooseView"));
const LazyLogAllWorkouts = lazy(
	() => import("../pages/Workout/logAllWorkouts")
);
const LazyWorkoutPlans = lazy(() => import("../pages/Workout/WorkoutPlans"));

const userJSON = localStorage.getItem("userFittness");
const user = userJSON ? JSON.parse(userJSON) : null;

function WorkoutPresenter(): JSX.Element {
	const [myWorkouts, setMyWorkouts] = useState(true);
	const [showLog, setShowLog] = useState(false);
	const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);
	const [myPlan, setMyPlan] = useState<WorkoutDay[]>([]);
	const [search, setSearch] = useState("");
	const [addPlan, setAddPlan] = useState(false);
	const [day, setDay] = useState("");
	const [name, setName] = useState("");
	const [completedWorkouts, setCompletedWorkouts] = useState<any[]>([]);

	// Used for navigation
	const navigate = useNavigate();

	// Render handler for choose view
	function renderHandler(choice: string) {
		if (choice === "My Workouts") {
			setMyWorkouts(true);
			setShowLog(false);
		} else if (choice === "Workout Logs") {
			setMyWorkouts(false);
			setShowLog(true);
		}
	}
	// Navigate to item page
	function itemPage(item: WorkoutDay) {
		const data = {
			id: item.plan_id,
			name: item.workoutName,
			day: item.workoutDay,
		};
		const queryParam = encodeURIComponent(JSON.stringify(data));
		navigate(`/itemPage?data=${queryParam}`);
	}

	// Navigate to workout page
	function toWorkout(item: WorkoutDay) {
		const data = {
			id: item.plan_id,
			name: item.workoutName,
			day: item.workoutDay,
		};

		const queryParam = encodeURIComponent(JSON.stringify(data));

		navigate(`/progress?data=${queryParam}`);
	}

	// Delete workout plan from database
	async function deleteWorkoutPlan(id: number) {
		const response = await fetch(
			"https://fitnessproject.onrender.com/api/workout/deleteAllWorkouts",
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

		if (response.status !== 200) {
			alert("Could not delete workout plan");
		} else {
			alert("Deleted!");
			const updatedMyPlan = myPlan.filter((item) => item.plan_id !== id);
			setMyPlan(updatedMyPlan);
			localStorage.setItem(user.email, JSON.stringify(updatedMyPlan));
		}
	}

	// Add new plan to local storage
	function addHandler() {
		const newItem = { id: Date.now(), day: day, name: name };

		//setWorkoutDays((prevWorkoutDays) => [...prevWorkoutDays, newItem]);
		//setMyPlan((prevMyPlan) => [...prevMyPlan, newItem]);

		localStorage.setItem(user.email, JSON.stringify([...workoutDays, newItem]));

		setAddPlan(false);
	}

	// Add new plan to database
	async function addToDatabase() {
		const response = await fetch(
			"https://fitnessproject.onrender.com/api/workout/add",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					workoutName: name,
					workoutDay: day,
					excercises: [""],
					plan_id: Date.now(),
				}),
			}
		);
		const data = await response.json();
		if (response.status === 200) {
			alert("Added new plan!");
			window.location.reload();
		} else {
			console.log(data.Error);
			alert("Fail");
		}
	}

	async function fetchCompletedWorkouts() {
		const response = await fetch(
			"https://fitnessproject.onrender.com/api/workout/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			}
		);
		const data = await response.json();

		let filteredData: any = [];
		for (let i = 0; i < data.length; i++) {
			data[i].completedWorkouts.forEach((workout: any) => {
				filteredData.push({
					name: data[i].workoutName,
					workout: workout,
				});
			});
		}
		setCompletedWorkouts(filteredData);
	}

	// Fetch all workouts from database
	async function fetchWorkouts() {
		const response = await fetch(
			"https://fitnessproject.onrender.com/api/workout/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			}
		);
		const data = await response.json();
		//setmyWorkouts(data);
		setWorkoutDays(data);
	}

	useEffect(() => {
		fetchWorkouts();
		fetchCompletedWorkouts();
	}, [myPlan]);

	function searchHandler(name: string) {
		const filteredWorkoutDays = workoutDays.filter(
			(workout) => workout.workoutName === name
		);
		setWorkoutDays(filteredWorkoutDays);
	}

	return (
		<div className="flex flex-col w-full min-h-screen">
			<Suspense fallback={<div>Loading...</div>}>
				<LazyChooseView
					showLog={showLog}
					renderHandler={renderHandler}
					myWorkouts={myWorkouts}
				/>
				<div className="bg-[#edeaea] flex-1">
					{myWorkouts && (
						<LazyWorkoutPlans
							workoutDays={workoutDays}
							search={search}
							setSearch={setSearch}
							addPlan={addPlan}
							searchHandler={searchHandler}
							setAddPlan={setAddPlan}
							itemPage={itemPage}
							toWorkout={toWorkout}
							deleteWorkoutPlan={deleteWorkoutPlan}
							addPlanPopup={
								<AddPlan
									addToDatabase={addToDatabase}
									setAddPlan={setAddPlan}
									addHandler={addHandler}
									day={day}
									setDay={setDay}
									name={name}
									setName={setName}
								/>
							}
						/>
					)}
					{showLog && (
						<LazyLogAllWorkouts completedWorkouts={completedWorkouts} />
					)}
				</div>
			</Suspense>
		</div>
	);
}

export default WorkoutPresenter;
