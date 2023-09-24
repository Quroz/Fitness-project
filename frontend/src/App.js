// Imported libraries and components
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Imported log in and sign up pages
import Login from "./pages/Login";
import Signup from "./pages/SignupView";

/* Import all presenters --> Gör detta MVP */
import ExplorePresenter from "./presenters/Explore";

/*Import all the view pages */
import NavbarView from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Workout from "./pages/Workout";
import Settings from "./pages/Settings";
import StartPage from "./pages/StartPage";
import PageItem from "./pages/Workouts";
import WorkoutPage from "./pages/WorkoutPage";
import Workouts from "./pages/Workouts";
const loggedIn = localStorage.getItem("userFittness");

function App() {
	const pathname = window.location.pathname;

	return (
		<div>
			<BrowserRouter>
				{loggedIn &&
					(pathname == "/login" ||
						pathname == "/" ||
						pathname == "/signup") && <Navigate to="/dashboard" />}

				{!loggedIn && (
					<Routes>
						<Route path="/" element={<StartPage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				)}

				{loggedIn && (
					<div className="flex">
						<div className="flex w-11">
							<NavbarView />
						</div>
						<div className="flex-1">
							<Routes>
								{/*The same order of the navbar icons drawn in my sketch-Rakin */}

								<Route
									path="/dashboard"
									element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
								/>
								<Route path="/progress" element={<Progress />} />
								<Route path="/explore" element={<ExplorePresenter />} />
								<Route path="/settings" element={<Settings />} />
								<Route path="/pageitem" element={<PageItem />} />
								<Route path="/workoutplan" element={<WorkoutPage />} />
								<Route path="/test" element={<Workouts />} />
								<Route path="/settings" element={<Settings />} />
							</Routes>
						</div>
					</div>
				)}
			</BrowserRouter>
		</div>
	);
}

export default App;
