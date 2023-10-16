import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/SignupView";
import NavbarView from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import StartPage from "./pages/StartPage";
import WorkoutPresenter from "./presenters/WorkoutPresenter";
import ItemPagePresenter from "./presenters/ItemPresenter";
import { ProgressPresenter } from "./presenters/ProgressPresenter";
import SettingsPresenter from "./presenters/SettingsPresenter";

const loggedIn = localStorage.getItem("userFittness");

// Lazy-loaded components
const Explore = React.lazy(() => import("./presenters/Explore"));
const InstructionsPage = React.lazy(() =>
	import("./pages/Explore/InstructionsView")
);

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
					<div className="flex h-screen">
						<NavbarView />
						<div className="flex-1 ml-11">
							<Routes>
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
									element={
										loggedIn ? (
											<Suspense fallback={<div>Loading...</div>}>
												<Explore />
											</Suspense>
										) : (
											<Navigate to="/login" />
										)
									}
								/>
								<Route
									path="/settings"
									element={
										loggedIn ? <SettingsPresenter /> : <Navigate to="/login" />
									}
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
										loggedIn ? (
											<Suspense fallback={<div>Loading...</div>}>
												<InstructionsPage />
											</Suspense>
										) : (
											<Navigate to="/login" />
										)
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
