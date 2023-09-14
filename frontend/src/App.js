// Imported libraries and components
import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

// Imported pages we created
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NavbarView from "./pages/Navbar";


function App() {
  return (
		<div>
			<NavbarView />
      
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
