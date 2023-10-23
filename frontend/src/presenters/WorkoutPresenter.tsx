import React, { useEffect, useState, lazy, Suspense, useContext } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutDay from "../interfaces/WorkoutDay";
import AddPlan from "../components/Workout/AddPlanPopup";
import LoadingComp from "../components/Loading";
import AppContext from "../context/app/AppContext";
import Workout from "../interfaces/WorkoutInterface";


const LazyChooseView = lazy(() => import("../pages/Workout/ChooseView"));
const LazyLogAllWorkouts = lazy(
	() => import("../pages/Workout/logAllWorkouts")
);
const LazyWorkoutPlans = lazy(() => import("../pages/Workout/WorkoutPlans"));
interface Context {
	workoutData: WorkoutDay[];
	completedWorkouts: any;
	dashboardData: any;
	user: any;
	setData: () => void;
	setUser: () => void;
	setCompleted: () => void;
	setDashboardData: () => void;
	addWorkout: (name: string, day: string) => void;
	removeWorkout: () => void;
	setCurrentWorkout: (item: WorkoutDay) => void;
  }
function WorkoutPresenter(): JSX.Element {
	const [myWorkouts, setMyWorkouts] = useState(true);
	const [showLog, setShowLog] = useState(false);
	const [addPlan, setAddPlan] = useState(false);
	const [day, setDay] = useState("");
	const [name, setName] = useState("");
	const context = useContext(AppContext);
	const {
	  completedWorkouts,
	  workoutData,
	  addWorkout,
	  removeWorkout,
	  setCurrentWorkout
	} = context as Context;

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
		setCurrentWorkout(item);
		navigate(`/itemPage`);
	}

	// Navigate to workout page
	function toWorkout(item: WorkoutDay) {
		setCurrentWorkout(item);
		navigate(`/progress`);
	}

	return (
		<div>
			<Suspense fallback={<div> <LoadingComp loading={true}/> </div>}>
				<LazyChooseView
					showLog={showLog}
					renderHandler={renderHandler}
					myWorkouts={myWorkouts}
				/>
				<div >
					{myWorkouts && (
						<LazyWorkoutPlans
							workoutDays={workoutData}
							addPlan={addPlan}
							setAddPlan={setAddPlan}
							itemPage={itemPage}
							toWorkout={toWorkout}
							deleteWorkoutPlan={removeWorkout}
							addPlanPopup={
								<AddPlan
									addToDatabase={addWorkout}
									setAddPlan={setAddPlan}
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
