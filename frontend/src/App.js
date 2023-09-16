import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

import StartPage from "./pages/StartPage"
import Home from "./pages/Home"



const loggedUser = JSON.parse(localStorage.getItem("userFittness"))


function App() {
  return (
    <div>
        <BrowserRouter>
              <Routes>
                  <Route path = "/" element = {<StartPage/>}/>
                  <Route path = "/login" element = {loggedUser ? <Home/> : <Navigate to = "/login"/>}/>
                  <Route path = "/signup" element =  {loggedUser ? <Home/> : <Navigate to = "/signup"/>}/>
                  <Route path = "/home" element = {loggedUser ? <Home/> : <Navigate to = "/login"/>}/>
              </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
