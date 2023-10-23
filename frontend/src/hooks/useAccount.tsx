import React, { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/app/AppContext";

export interface IAppProps {}

export function useAccount(props: IAppProps) {
	const [loginError, setLoginError] = useState<string | null>(null);
	const [signupError, setSignupError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const context = useContext(AppContext);
	const {setData, setUser, setCompleted, setDashboard} = context as {setData:()=>void, setUser:()=>void, setCompleted: ()=>void, setDashboard: ()=> void};

	async function login(email: String, password: String) {
		setLoginError(null);

		setIsLoading(true)
		const response = await fetch("https://fitnessproject.onrender.com/api/user/login/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();

		if (response.status !== 200) {
			setIsLoading(false)
			setLoginError(data.error);
			alert(data.error)
		} else {
			setIsLoading(false)
			localStorage.setItem("userFittness", JSON.stringify(data));
			navigate("/dashboard");
			window.location.reload();
			setData();

			
		}
	}

	async function signup(
		email: String,
		password: String,
		name: String,
		weight: String,
		height: String,
		age: String
	) {
	
		setSignupError(null);
		
		setIsLoading(true)
		const response = await fetch("https://fitnessproject.onrender.com/api/user/signup/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password, name, weight, height, age }),
		});
		const data = await response.json();

		if (response.status !== 200) {
				setIsLoading(false)
				setSignupError(data.error);
				alert(data.error);
		} else {
				setIsLoading(false)
				localStorage.setItem("userFittness", JSON.stringify(data));
				navigate("/dashboard");
				window.location.reload();
		}
	}

	function logout() {
		localStorage.removeItem("userFittness");
		window.location.reload();
	}

	return { login, loginError, signup, signupError, logout,setSignupError, isLoading };
}
