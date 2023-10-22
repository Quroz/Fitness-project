import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";
import LoadingComp from "../components/Loading";

export interface IAppProps {
	login: Function;
	loginError: String;
}

export default function Login(props: IAppProps) {
	
	const { login, loginError, isLoading} = useAccount({});

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	async function clickHandler() {
		await login(email, password);
	}
	

	return (
		<div className="w-full h-screen">
			 {isLoading && 
				<div className="absolute w-full h-full flex items-center justify-center">
					<LoadingComp loading = {isLoading}/>
				</div>
			}
			<div className="flex w-full h-full">
				<div className="w-[40%] bg-black h-full flex flex-col px-4 py-16">
					<h1 className="text-4xl font-bold text-white">Login</h1>
					<div className="flex gap-2 mt-2">
						<p className="text-gray-100 text-md">Don't have an account yet?</p>
						<Link to="/signup">
							<p className="font-bold text-gray-100 underline hover:text-green-200">
								Sign up
							</p>
						</Link>
					</div>
					<div className="flex flex-col w-full gap-1 mt-10">
						<label className="text-xl text-white">Email Address</label>
						<input
							className="border-[1px] border-black indent-1 rounded-md py-4"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-1 mt-5">
						<label className="text-xl text-white">Password</label>
						<input
							className="border-[1px] border-black indent-1 rounded-md py-4"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					{loginError && (
						<p className="mt-1 text-red-500 text-md">{loginError}</p>
					)}
					<button
						className="p-4 mt-12 text-xl text-center text-white bg-green-400 rounded-md hover:bg-green-300"
						onClick={clickHandler}
					>
						LOGIN
					</button>
				</div>
				<div className="flex-1 w-full h-full">
					<img
						className="object-cover w-full h-full"
						src="https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2022/11/Strength-training-programs.jpg?fit=1988%2C1327&ssl=1"
					/>
				</div>
			</div>
		</div>
	);
}
