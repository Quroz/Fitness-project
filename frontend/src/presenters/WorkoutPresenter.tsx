import React, { useState } from "react";

import WorkoutPlans from "../pages/Workout/WorkoutPlans";

import ChooseView from "../components/Workout/ChooseView";

type Props = {};

function WorkoutPresenter({}: Props): JSX.Element {
	const [search, setSearch] = useState("");
	const [myWorkouts, setMyWorkouts] = useState(true);
	const [showLog, setShowLog] = useState(false);

	function renderHandler(choice: string) {
		if (choice === "myWorkouts") {
			setMyWorkouts(true);
			setShowLog(false);
		} else if (choice === "Workout Logs") {
			setMyWorkouts(false);
			setShowLog(true);
		}
	}

	return (
		<div>
			<ChooseView
				showLog={showLog}
				renderHandler={renderHandler}
				myWorkouts={myWorkouts}
			/>
		</div>
	);
}

export default WorkoutPresenter;
