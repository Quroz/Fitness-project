// Imported libraries and components
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Imported log in and sign up pages
import Login from "./pages/Login";
import Signup from "./pages/SignupView";

/*Import all the view pages */
import NavbarView from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Workout from "./pages/Workout";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import StartPage from "./pages/StartPage";

const loggedIn = localStorage.getItem("userFittness");

function App() {
	return (
		<div>
			<BrowserRouter>
            {!loggedIn && 
              <Routes>
                <Route path="/" element={<StartPage/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            }
            {loggedIn && 
                <div className="flex">
                  <NavbarView />
                  <div className="flex-1">
                    <Routes>
                        {/*The same order of the navbar icons drawn in my sketch-Rakin */}
                      
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/workoutplan" element={<Workout />} />
                        <Route path="/progress" element={<Progress />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </div>
                </div>
            }
           
			</BrowserRouter>
		</div>
	);
}

export default App;
