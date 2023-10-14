import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/SignupView";

import NavbarView from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Explore from "./presenters/Explore";
import Settings from "./pages/Settings";
import StartPage from "./pages/StartPage";
import PageItem from "./pages/Workouts";
import WorkoutPresenter from "./presenters/WorkoutPresenter";
import Workouts from "./pages/Workouts";
import ItemPage from "./components/ItemPage";
import ItemPagePresenter from "./presenters/ItemPresenter";
import InstructionsPage from "./pages/Explore/InstructionsView";

import { ProgressPresenter } from "./pages/ProgressPresenter";

const loggedIn = localStorage.getItem("userFittness");

function App() {
	const pathname = window.location.pathname;

	return (
		<div>
			<BrowserRouter>
				{!loggedIn && (
					<Routes>
						<Route path="/" element={<StartPage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/*" element={<Navigate to="/login" />} />
					</Routes>
				)}

				{loggedIn && (
					<div className="flex">
						<NavbarView />
						<div className="flex-1 ml-11">
							<Routes>
								{/* The same order of the navbar icons drawn in my sketch-Rakin */}
								{loggedIn &&
									(pathname === "/login" ||
										pathname === "/" ||
										pathname === "/signup") && <Route path="/dashboard" />}
								<Route
									path="/dashboard"
									element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
								/>
								<Route
									path="/progress"
									element={
										loggedIn ? <ProgressPresenter /> : <Navigate to="/login" />
									}
								/>
								<Route
									path="/explore"
									element={loggedIn ? <Explore /> : <Navigate to="/login" />}
								/>
								<Route
									path="/settings"
									element={loggedIn ? <Settings /> : <Navigate to="/login" />}
								/>
								<Route
									path="/pageitem"
									element={loggedIn ? <PageItem /> : <Navigate to="/login" />}
								/>

								<Route
									path="/workoutplan"
									element={
										loggedIn ? <WorkoutPresenter /> : <Navigate to="/login" />
									}
								/>
								<Route
									path="/itemPage"
									element={
										loggedIn ? <ItemPagePresenter /> : <Navigate to="/login" />
									}
								/>
								<Route
									path="/instructions"
									element={
										loggedIn ? <InstructionsPage /> : <Navigate to="/login" />
									}
								/>
							</Routes>
						</div>
					</div>
				)}
			</BrowserRouter>
		</div>
	);
}

export default App;
