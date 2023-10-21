import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";

export interface IAppProps {
  heightOptions: number[];
  ageOptions: number[];
  weightOptions: number[];
  signup: Function;
  setSignupError: Function;
  signupError: String;
}

export default function Signup(props: IAppProps) {
  const { signup, signupError, setSignupError } = useAccount(props);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  

  const heightOptions = Array.from({ length: 121 }, (_, index) => 100 + index);
  const ageOptions = Array.from({ length: 100 }, (_, index) => index + 1);
  const weightOptions = Array.from({ length: 181 }, (_, index) => 20 + index);


  async function clickHandler() {
    if (password !== confirmPassword) {
      setSignupError("Passwords do not match");
      alert("Passwords do not match");
    } else {
        await signup(email, password, name, weight, height, age);
    }
  }
  
  return (
    <div className="w-full min-h-screen">
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
              className="border-[1px] border-black indent-1 rounded-md py-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <label className="text-xl text-white">Password</label>
            <input
              className="border-[1px] border-black indent-1 rounded-md py-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <label className="text-xl text-white">Confirm Password</label>
            <input
              className="border-[1px] border-black indent-1 rounded-md py-2"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <label className="text-xl text-white">Enter your name</label>
            <input
              className="border-[1px] border-black indent-1 rounded-md py-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <label className="text-xl text-white">Enter your height (in cm)</label>
            <select
              id='weightDropdown' 
              value={height}
              className="border-black border-[1px] rounded-md p-2"
              onChange={(e) => setHeight(e.target.value)}
            >
              <option value=''>--------</option>
              {heightOptions.map((height) => (
                <option key={height} value={height}>
                  {height} cm
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <label className="text-xl text-white">Enter your weight (in kg)</label>
            <select
              id='weightDropdown' 
              value={weight}
              className="border-black border-[1px] rounded-md p-2"
              onChange={(e) => setWeight(e.target.value)}
            >
              <option value=''>--------</option>
              {weightOptions.map((weight) => (
                <option key={weight} value={weight}>
                  {weight} kg
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <label className="text-xl text-white">Enter your age</label>
            <select
              id='weightDropdown'
              value={age}
              className="border-black border-[1px] rounded-md p-2"
              onChange={(e) => setAge(e.target.value)}
            >
              <option value=''>--------</option>
              {ageOptions.map((age) => (
                <option key={age} value={age}>
                  {age} years
                </option>
              ))}
            </select>
          </div>
          {signupError && <p className="text-red-500 mt-1 text-md">{signupError}</p>}
          <button
            className="text-center p-4 bg-green-400 mt-12 rounded-md hover:bg-green-300 text-white text-xl"
            onClick={clickHandler}
          >
            SIGNUP
          </button>
        </div>
        <div className="w-full min-h-full flex-1 bg-red-500">
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
