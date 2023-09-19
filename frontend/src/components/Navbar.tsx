/*
This file is the view for the navbar. It will be used to display the navbar on the screen.
You should be able to navigate to the other pages from the navbar. 
*/

/*
The navbar will be a vertical navbar on the left side of the screen.
*/
import React, { useState } from "react";
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

type Props = {};

function NavbarView({}: Props) {
	const [thisPage, setThisPage] = useState("dashboard"); // ['dashboard', 'workoutplan', 'progress', 'explore'
	/*If link is pressed, the icon is to have a darker background */
	return (
		<div className="flex flex-col h-screen bg-gray-200 w-11 ">
			<nav className="flex-col object-center mt-20 mr-2">
				<div className="space-y-4">
					<div
						className={`${
							thisPage === "dashboard" ? "bg-green-100	" : "bg-transparent"
						} transform transition-transform hover:scale-105`}
						onClick={() => setThisPage("dashboard")}
					>
						<Link to="/dashboard">
							<img src={DashboardIcon} alt="Dashboard Icon" />
						</Link>
					</div>
					<div
						className={`${
							thisPage === "workoutplan" ? "bg-green-100	" : "bg-transparent"
						} transform transition-transform hover:scale-105`}
						onClick={() => setThisPage("workoutplan")}
					>
						<Link to="/workoutplan">
							<img
								src={WorkoutPlanIcon}
								alt="Workout Plan Icon"
								className="my-2"
							/>
						</Link>
					</div>
					<div
						className={`${
							thisPage === "progress" ? "bg-green-100" : "bg-transparent"
						} transform transition-transform hover:scale-105`}
						onClick={() => setThisPage("progress")}
					>
						<Link to="/progress">
							<img
								src={ProgressionIcon}
								alt="Progression Icon"
								className="my-2"
							/>
						</Link>
					</div>
					<div
						className={`${
							thisPage === "explore" ? "bg-green-100" : "bg-transparent"
						} transform transition-transform hover:scale-105`}
						onClick={() => setThisPage("explore")}
					>
						<Link to="/explore">
							<img src={ExploreIcon} alt="Explore Icon" className="my-2" />
						</Link>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default NavbarView;
