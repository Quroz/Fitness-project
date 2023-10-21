import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IAppProps {}

export function useAccount(props: IAppProps) {
	const [loginError, setLoginError] = useState(null);
	const [signupError, setSignupError] = useState(null);
	const navigate = useNavigate();

	async function login(email: String, password: String) {
		setLoginError(null);

		const response = await fetch("https://fitnessproject.onrender.com/api/user/login/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();

		if (response.status !== 200) {
			setLoginError(data.error);
			alert(data.error)
		} else {
			localStorage.setItem("userFittness", JSON.stringify(data));
			navigate("/dashboard");
			window.location.reload();
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

		const response = await fetch("https://fitnessproject.onrender.com/api/user/signup/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password, name, weight, height, age }),
		});
		const data = await response.json();

		if (response.status !== 200) {
			setSignupError(data.error);
			alert(data.error);
		} else {
			localStorage.setItem("userFittness", JSON.stringify(data));
			navigate("/dashboard");
			window.location.reload();
		}
	}

	function logout() {
		localStorage.removeItem("userFittness");
		window.location.reload();
	}

	return { login, loginError, signup, signupError, logout };
}
