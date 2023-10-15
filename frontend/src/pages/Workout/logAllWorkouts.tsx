import React from "react";
import Workout from "../../interfaces/WorkoutInterface";

interface CompWorkouts {
	name: string;
	date: string;
	workout: Workout;
}
interface Iprops {
	completedWorkouts: CompWorkouts[];
}
function LogAllWorkouts({ completedWorkouts }: Iprops) {
	return (
		<div>
			{completedWorkouts.map((wo, index) => {
				return (
					<div className="flex">
						<div>{wo.name}</div>
						<div></div>
					</div>
				);
			})}
		</div>
	);
}

export default LogAllWorkouts;
