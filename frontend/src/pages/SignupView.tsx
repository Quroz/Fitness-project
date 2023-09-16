import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";

export interface IAppProps {}

export default function Signup(props: IAppProps) {
  const { signup, signupError } = useAccount(props);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function clickHandler() {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      await signup(email, password);
      navigate("/dashboard");
      window.location.reload();
    }
  }

  return (
    <div className="w-full h-screen">
      <div className="w-full m-auto flex h-full">
        <div className="w-[40%] bg-black h-full flex flex-col px-4 py-16">
          <h1 className="text-4xl font-bold text-white">Signup</h1>
          <div className="flex gap-2 mt-2">
            <p className="text-md text-gray-100">Already have an account?</p>
            <Link to="/login">
              <p className="font-bold underline hover:text-green-200 text-gray-100">Login</p>
            </Link>
          </div>
          <div className="flex flex-col w-full mt-10 gap-1">
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
          <div className="flex flex-col gap-1 mt-5">
            <label className="text-xl text-white">Confirm Password</label>
            <input
              className="border-[1px] border-black indent-1 rounded-md py-4"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {signupError && <p className="text-red-500 mt-1 text-md">{signupError}</p>}
          {error && <p className="text-red-500 mt-1 text-md">{error}</p>}
          <button
            className="text-center p-4 bg-green-400 mt-12 rounded-md hover:bg-green-300 text-white text-xl"
            onClick={clickHandler}
          >
            SIGNUP
          </button>
        </div>
        <div className="w-full h-full flex-1 bg-red-500">
          <img
            className="w-full h-full object-cover"
            src="https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2022/11/Strength-training-programs.jpg?fit=1988%2C1327&ssl=1"
            alt="Strength Training"
          />
        </div>
      </div>
    </div>
  );
}
