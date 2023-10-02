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
import SettingsIcon from "../assets/Navbar/settings.png";
import LogoutIcon from "../assets/Navbar/logout.png";

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
	const [thisPage, setThisPage] = useState("dashboard"); // ['dashboard', 'workoutplan', 'progress', 'explore', 'settings'
	/*If link is pressed, the icon is to have a darker background */
	return (

		<div className="fixed flex flex-col h-screen w-11">
			{/*This is the logo --> om ni vill ha grå bakgrund på hela navbar då lägg bg-zinc-100 nedanför i nav:et */}
			<nav className="flex flex-col justify-between object-center h-screen my-10 mt-20 mr-2 ">
				{/*This is the 4 icons */}
				<div className="flex flex-col space-y-4 bg-zinc-100">
					<div
						className={`${
							thisPage === "dashboard"
								? "bg-green-100 border border-black	"
								: "bg-transparent"
						} transform transition-transform hover:scale-110`}
						onClick={() => setThisPage("dashboard")}
					>
						<Link to="/dashboard">
							<img src={DashboardIcon} alt="Dashboard Icon" />
						</Link>
					</div>
					<div
						className={`${
							thisPage === "workoutplan"
								? "bg-green-100 border border-black "
								: "bg-transparent"
						} transform transition-transform hover:scale-110`}
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
							thisPage === "progress"
								? "bg-green-100 border border-black"
								: "bg-transparent"
						} transform transition-transform hover:scale-110`}
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
							thisPage === "explore"
								? "bg-green-100 border border-black"
								: "bg-transparent"
						} transform transition-transform hover:scale-110`}
						onClick={() => setThisPage("explore")}
					>
						<Link to="/explore">
							<img src={ExploreIcon} alt="Explore Icon" className="my-2" />
						</Link>
					</div>
				</div>
				{/*This is the logout button and settings*/}
				<div className="flex flex-col space-y-4 bg-zinc-100">
					<div onClick={() => console.log("Log out!!")}>
						<div>
							<img src={LogoutIcon} alt="Logout Icon" />
						</div>
					</div>
					<div
						className={`${
							thisPage === "settings"
								? "bg-green-100 border border-black"
								: "bg-transparent"
						} transform transition-transform hover:scale-110`}
						onClick={() => setThisPage("settings")}
					>
						<Link to="/settings">
							<img src={SettingsIcon} alt="Settings Icon" />
						</Link>
					</div>
				</div>

			</nav>
		</div>
	);
}

export default NavbarView;
