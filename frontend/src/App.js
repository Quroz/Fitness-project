import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

const loggedUser = localStorage.getItem("User")

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path = "/login" element = {!loggedUser ? <Login/> : <Navigate to = "/"/> }/>
              <Route path = "/signup" element =  {!loggedUser ? <Signup/> : <Navigate to = "/"/> }/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
