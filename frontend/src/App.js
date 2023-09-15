import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

const loggedUser = JSON.parse(localStorage.getItem("userFittness"))

console.log("loggedIn", loggedUser)


function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path = "/login" element = {<Login/>}/>
              <Route path = "/signup" element =  {<Signup/> }/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
