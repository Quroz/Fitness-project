import React, { useEffect, useState } from "react";
import WorkoutPlans from "../pages/Workout/WorkoutPlans";
import ChooseView from "../pages/Workout/ChooseView";
import LogAllWorkouts from "../pages/Workout/logAllWorkouts";
import WorkoutDay from "../interfaces/WorkoutDay";
import { useNavigate } from "react-router-dom";
import AddPlan from "../components/Workout/AddPlanPopup";

type Props = {};

const userJSON = localStorage.getItem("userFittness");
const user = userJSON ? JSON.parse(userJSON) : null;

function WorkoutPresenter({}: Props): JSX.Element {
	// MyWorkouts and Showlog are used to render the correct component
	const [myWorkouts, setMyWorkouts] = useState(true);
	const [showLog, setShowLog] = useState(false);
	// Used to store and search the workout days. --> filteredArray
	const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);
	const [myPlan, setMyPlan] = useState<WorkoutDay[]>([]);
	const [search, setSearch] = useState("");
	// Used to add a new plan
	const [addPlan, setAddPlan] = useState(false);

	// Related to AddPlanPopup
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
		  id: item.id,
		  name: item.name,
		};
	  
		const queryParam = encodeURIComponent(JSON.stringify(data));
	
		navigate(`/itemPage?data=${queryParam}`);
	  }

	  function toWorkout(item: WorkoutDay) {
		console.log("item", item)
		const data = {
			id: item.id,
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
		  const updatedMyPlan = myPlan.filter((item) => item.id !== id);
		  console.log("updatedMyPlan", updatedMyPlan);
		  setMyPlan(updatedMyPlan);
		  localStorage.setItem(user.email, JSON.stringify(updatedMyPlan));
		}
	  }
	  
	function addHandler() {

		const newItem = { id: Date.now(), day: day, name: name };
	  
		setWorkoutDays(prevWorkoutDays => [...prevWorkoutDays, newItem]);
		setMyPlan(prevMyPlan => [...prevMyPlan, newItem]);
	  
		localStorage.setItem(
		  user.email,
		  JSON.stringify([...workoutDays, newItem])
		);
	  
		setAddPlan(false);
	  }

	useEffect(() => {
		/* Check if myPlan has changed */
		if(search == ""){
			const storedWorkoutDaysJSON = localStorage.getItem(user.email);
			const parsedWorkoutDays = storedWorkoutDaysJSON
			  ? JSON.parse(storedWorkoutDaysJSON)
			  : [];
		  
			console.log("daays", workoutDays)
			setWorkoutDays(parsedWorkoutDays);
		}
	}, [myPlan, search]);


	function searchHandler(name: string){

		console.log("search", name)
		const filteredWorkoutDays = workoutDays.filter((workout) => workout.name === name);
		setWorkoutDays(filteredWorkoutDays)
	}

	return (
		<div className="flex flex-col w-full min-h-screen">
			<ChooseView
				showLog={showLog}
				renderHandler={renderHandler}
				myWorkouts={myWorkouts}
			/>
			<div className="bg-[#edeaea] flex-1 ">
				{myWorkouts && (
					<WorkoutPlans
						workoutDays={workoutDays}
						search={search}
						setSearch={setSearch}
						addPlan={addPlan}
						searchHandler = {searchHandler}
						setAddPlan={setAddPlan}
						checkHandler={checkHandler}
						itemPage={itemPage}
						toWorkout = {toWorkout}
						deleteWorkoutPlan={deleteWorkoutPlan}
						addPlanPopup={
							<AddPlan
								
								addPlan={addPlan}
								setAddPlan={setAddPlan}
								myPlan={myPlan}
								setMyPlan={setMyPlan}
								addHandler={addHandler}
								day={day}
								setDay={setDay}
								name={name}
								setName={setName}
							/>
						}
					/>
				)}
				{showLog && <LogAllWorkouts />}
			</div>
		</div>
	);
}

export default WorkoutPresenter;
