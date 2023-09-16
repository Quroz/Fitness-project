import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import StartPage from "./pages/StartPage"

const loggedUser = JSON.parse(localStorage.getItem("userFittness"))


function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path = "/" element = {loggedUser ? <StartPage/> : <Navigate to = "/login"/>}/>
              <Route path = "/login" element = {<Login/>}/>
              <Route path = "/signup" element =  {<Signup/> }/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
