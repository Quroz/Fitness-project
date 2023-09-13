import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"


function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path = "/login" element = {<Login/>}/>
              <Route path = "/signup" element =  {<Signup/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
