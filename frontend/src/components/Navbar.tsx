/*
This file is the view for the navbar. It will be used to display the navbar on the screen.
You should be able to navigate to the other pages from the navbar. 
*/

/*
The navbar will be a vertical navbar on the left side of the screen.
*/
import React from "react";
import { Link } from "react-router-dom";

// Import icons and images

import DashboardIcon from "../assets/Navbar/dashboard.png";
import WorkoutPlanIcon from "../assets/Navbar/workout.png";
import ProgressionIcon from "../assets/Navbar/progress.png";
import ExploreIcon from "../assets/Navbar/explore.png";

/* REGARDING THE STYLING OF THE NAVBAR:
______________________________________

The navbar will be a vertical navbar on the left side of the screen.
The navbar will be a flexbox with a column direction.
The navbar will have a width of constant 15% of the screen.
The navbar will have a height of 100% of the screen.

First div --> flexbox with column direction


*/

function NavbarView() {
	return (
		<div className="flex flex-col w-20 h-screen bg-lime-300 ">
			<nav className="flex-col">
				<Link to="/dashboard">
					<img src={DashboardIcon} alt="Dashboard Icon" />
				</Link>
				<Link to="/workoutplan">
					<img src={WorkoutPlanIcon} alt="Workout Plan Icon" className="my-2" />
				</Link>
				<Link to="/progress">
					<img src={ProgressionIcon} alt="Progression Icon" className="my-2" />
				</Link>
				<Link to="/explore">
					<img src={ExploreIcon} alt="Explore Icon" className="my-2" />
				</Link>
			</nav>
		</div>
	);
}

export default NavbarView;
