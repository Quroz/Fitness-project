import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//Context
import AppState from "./context/app/AppState";

//Navbar
import NavbarPresenter from "./presenters/NavbarPresenter";

import DashboardPresenter from "./presenters/DashboardPresenter";
import StartPage from "./pages/StartPage/StartPageView";
import WorkoutPresenter from "./presenters/WorkoutPresenter";
import ItemPagePresenter from "./presenters/ItemPresenter";
import { ProgressPresenter } from "./presenters/ProgressPresenter";
import SettingsPresenter from "./presenters/SettingsPresenter";

//Authentication
import LoginPresenter from "./presenters/LoginPresenter";
import SignupPresenter from "./presenters/SignupPresenter";

const loggedIn = localStorage.getItem("userFittness");

// Lazy-loaded components
const Explore = React.lazy(() => import("./presenters/Explore"));
const InstructionsPage = React.lazy(() =>
	import("./presenters/InstructionsPresenter")
);

function App() {
	

	return (
		<div>
			<AppState>
			<BrowserRouter>
				{!loggedIn && (
					<Routes>
						<Route path="/" element={<StartPage />} />
						<Route path="/login" element={<LoginPresenter />} />
						<Route path="/signup" element={<SignupPresenter />} />
						<Route path="/*" element={<Navigate to="/login" />} />
					</Routes>
				)}

				{loggedIn && (
					<div className="flex h-screen">
						<NavbarPresenter />
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
			</AppState>
		</div>
	);
}

export default App;
