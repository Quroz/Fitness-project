import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import WorkoutPlan from "./pages/WorkoutPlan";

const loggedUser = JSON.parse(localStorage.getItem("userFittness"))

console.log("loggedIn", loggedUser)


function App() {
  return (
    <div>
      <BrowserRouter>
          <div className="flex">
            <div className="h-screen w-48 bg-red-500"/>
            <div className="flex-1">
              <Routes>
                  <Route path = "/login" element = {<Login/>}/>
                  <Route path = "/signup" element =  {<Signup/>}/>
                  <Route path = "/workoutplan" element = {<WorkoutPlan/>}/>
              </Routes>
            </div>
          </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
