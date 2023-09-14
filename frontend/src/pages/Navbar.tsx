/*
This file is the view for the navbar. It will be used to display the navbar on the screen.
You should be able to navigate to the other pages from the navbar. 
*/

/*
The navbar will be a vertical navbar on the left side of the screen.
*/

// Import icons and images
import dashboard from "../Assets/Navbar/dboard.svg";
import workout from "../Assets/Navbar/workout.svg";
import progression from "../Assets/Navbar/progression.svg";
import explore from "../Assets/Navbar/explore.svg";

function NavbarView() {
	return (
		<div className="flex-col flex-auto w-min">
			<div className="flex-col flex-auto bg-slate-500">
				<div>Dashboard</div>
				<div>Workout Plan</div>
				<div>Progression</div>
				<div>Explore page</div>
				<div>Settings</div>
			</div>
		</div>
	);
}

export default NavbarView;
