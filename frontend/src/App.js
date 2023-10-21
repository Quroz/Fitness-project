import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/SignupView";
import NavbarView from "./components/Navbar";
import DashboardPresenter from "./presenters/DashboardPresenter";
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
	//const pathname = window.location.pathname;

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
								<Route path="/" element={<DashboardPresenter />} />
								<Route path="/dashboard" element={<DashboardPresenter />} />
								<Route path="/progress" element={<ProgressPresenter />} />
								<Route
									path="/explore"
									element={
										<Suspense fallback={<div className="w-full h-full flex items-center justify-center mt-8">Loading...</div>}>
											<Explore />
										</Suspense>
									}
								/>
								<Route path="/settings" element={<SettingsPresenter />} />
								<Route path="/workoutplan" element={<WorkoutPresenter />} />
								<Route path="/itemPage" element={<ItemPagePresenter />} />
								<Route
									path="/instructions"
									element={
										<Suspense fallback={<div className="w-full h-full flex items-center justify-center mt-8">Loading...</div>}>
											<InstructionsPage />
										</Suspense>
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
