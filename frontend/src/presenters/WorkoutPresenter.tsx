import React, { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutDay from "../interfaces/WorkoutDay";
import AddPlan from "../components/Workout/AddPlanPopup";
import LogAllWorkoutPresenter from "../pages/createWorkout/LogAllWorkoutPresenter";

const LazyChooseView = lazy(() => import("../pages/createWorkout/ChooseView"));
const LazyLogAllWorkouts = lazy(
	() => import("../pages/createWorkout/logAllWorkouts")
);
const LazyWorkoutPlans = lazy(
	() => import("../pages/createWorkout/WorkoutPlans")
);

type Props = {};

const userJSON = localStorage.getItem("userFittness");
const user = userJSON ? JSON.parse(userJSON) : null;

function WorkoutPresenter({}: Props): JSX.Element {
	const [myWorkouts, setMyWorkouts] = useState(true);
	const [showLog, setShowLog] = useState(false);
	const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);
	const [myPlan, setMyPlan] = useState<WorkoutDay[]>([]);
	const [search, setSearch] = useState("");
	const [addPlan, setAddPlan] = useState(false);
	const [day, setDay] = useState("");
	const [name, setName] = useState("");

	// Used for navigation
	const navigate = useNavigate();

	function renderHandler(choice: string) {
		if (choice === "My Workouts") {
			setMyWorkouts(true);
			setShowLog(false);
		} else if (choice === "Workout Logs") {
			setMyWorkouts(false);
			setShowLog(true);
		}
	}
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
	function itemPage(item: WorkoutDay) {
		const data = {
			id: item.plan_id,
			name: item.workoutName,
			day: item.workoutDay,
		};
		const queryParam = encodeURIComponent(JSON.stringify(data));
		navigate(`/itemPage?data=${queryParam}`);
	}

	function toWorkout(item: WorkoutDay) {
		const data = {
			id: item.plan_id,
			name: item.workoutName,
			day: item.workoutDay,
		};

		const queryParam = encodeURIComponent(JSON.stringify(data));

		navigate(`/progress?data=${queryParam}`);
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
			const updatedMyPlan = myPlan.filter((item) => item.plan_id !== id);
			setMyPlan(updatedMyPlan);
			localStorage.setItem(user.email, JSON.stringify(updatedMyPlan));
		}
	}

	function addHandler() {
		const newItem = { id: Date.now(), day: day, name: name };

		//setWorkoutDays((prevWorkoutDays) => [...prevWorkoutDays, newItem]);
		//setMyPlan((prevMyPlan) => [...prevMyPlan, newItem]);

		localStorage.setItem(user.email, JSON.stringify([...workoutDays, newItem]));

		setAddPlan(false);
	}

	async function addToDatabase() {
		const response = await fetch("http://localhost:4000/api/workout/add", {
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
		});
		const data = await response.json();
		console.log(data);
		if (response.status === 200) {
			alert("Added new plan!");
			window.location.reload();
		} else {
			console.log(data.Error);
			alert("Fail");
		}
	}

	useEffect(() => {
		/* Check if myPlan has changed */
		async function fetchWorkouts() {
			const response = await fetch("http://localhost:4000/api/workout/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			});
			const data = await response.json();
			//setmyWorkouts(data);
			setWorkoutDays(data);
		}
		fetchWorkouts();
	}, [myPlan, search]);

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
							checkHandler={checkHandler}
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
					{showLog && <LogAllWorkoutPresenter />}
				</div>
			</Suspense>
		</div>
	);
}

export default WorkoutPresenter;
