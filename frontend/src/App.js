// Imported libraries and components
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Imported log in and sign up pages
import Login from "./pages/Login";
import Signup from "./pages/SignupView";
import React, {useEffect} from 'react'
/*Import all the view pages */
import NavbarView from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Workout from "./pages/Workout";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import StartPage from "./pages/StartPage";
import PageItem from "./pages/Workouts";
import WorkoutPage from "./pages/WorkoutPage";
import Workouts from "./pages/Workouts";
const loggedIn = localStorage.getItem("userFittness");

function App() {

  useEffect(() => {
    
    async function test(){
          const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList';
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '083914206emsh11d92ddfb433948p11023ajsnd520bb0564e2',
              'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
          };

          try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
          } catch (error) {
            console.error(error);
          }
}
 test();
  },[])


  const pathname = window.location.pathname;

	return (
		<div>
			<BrowserRouter>

            {loggedIn && (pathname == "/login" || pathname == "/" || pathname == "/signup" ) &&
            <Navigate to = "/dashboard"/>
            }

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

                          
                        <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to ="/login"/>}/>
                        <Route path="/progress" element={<Progress />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/pageitem" element={<PageItem />} />
                        <Route path="/workoutplan" element={<WorkoutPage />} />
                        <Route path="/test" element={<Workouts />} />
                    </Routes>
                  </div>
                </div>
            }
           
			</BrowserRouter>
		</div>
	);
}

export default App;
