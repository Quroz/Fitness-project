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
                  <Route path = "/" element = {loggedUser ? <StartPage/> : <Navigate to = "/login"/>}/>
                  <Route path = "/login" element = {<Login/>}/>
                  <Route path = "/signup" element =  {<Signup/>}/>
                  <Route path = "/home" element = {<Home/>}/>
              </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
