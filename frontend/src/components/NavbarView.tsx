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
import DashboardIcon from "../Assets/Navbar/dashboard.png";
import WorkoutPlanIcon from "../Assets/Navbar/workout.png";
import ProgressionIcon from "../Assets/Navbar/progress.png";
import ExploreIcon from "../Assets/Navbar/explore.png";
import SettingsIcon from "../Assets/Navbar/settings.png";


/* REGARDING THE STYLING OF THE NAVBAR:
______________________________________

The navbar will be a vertical navbar on the left side of the screen.
The navbar will be a flexbox with a column direction.
The navbar will have a width of constant 15% of the screen.
The navbar will have a height of 100% of the screen.
The navbar will have a background color of #1F1F1F.



*/

function NavbarView() {
	return (
		<nav className="flex flex-col w-20 bg-teal-100 ">
			<Link to="/dashboard">
				<img src={DashboardIcon} alt="Dashboard Icon" />
			</Link>
			<Link to="/workoutplan">
				<img src={WorkoutPlanIcon} alt="Workout Plan Icon" />
			</Link>
			<Link to="/progress">
				<img src={ProgressionIcon} alt="Progression Icon" />
			</Link>
			<Link to="/explore">
				<img src={ExploreIcon} alt="Explore Icon" />
			</Link>
		</nav>
	);
}

export default NavbarView;
