/*
This file is the view for the navbar. It will be used to display the navbar on the screen.
You should be able to navigate to the other pages from the navbar. 
*/

/*
The navbar will be a vertical navbar on the left side of the screen.
*/
import React from "react";


// Import icons and images
import DashboardIcon from "../Assets/Navbar/dashboard.png";
import WorkoutPlanIcon from "../Assets/Navbar/workout.png";
import ProgressionIcon from "../Assets/Navbar/progress.png";
import ExploreIcon from "../Assets/Navbar/explore.png";


function NavbarView() {
	return (
		<div className="flex-col flex-auto w-min">
			<div className="flex-col flex-auto bg-slate-500">
				<div>
					<img src={DashboardIcon} alt="Dashboard Icon" />
				</div>
				<div>
					<img src={WorkoutPlanIcon} alt="Workout Plan Icon" />
				</div>
		
				<div>
					<img src={ProgressionIcon} alt="Progression Icon" />
				</div>
				<div>
					<img src={ExploreIcon} alt="Explore Icon" />
				</div>
				<div>Settings</div>
			</div>
		</div>
	);
}

export default NavbarView;
