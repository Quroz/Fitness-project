import React from "react";
import CircleBar from "../components/CircleBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import BarChart from "../components/BarChart";
import { useNavigate } from "react-router-dom";
import CompWorkouts from "../interfaces/CompWorkouts"


interface IProps {
  workouts: CompWorkouts[]
  favWorkout: string;
  barData: {name: string, value: number }[]
}


function Dashboard({ workouts, favWorkout, barData }: IProps) {

  const innerWidth = window.innerWidth;
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full justify-center flex-col bg-[#edeaea]">
      <div className="flex justify-center mt-6 h-2/5 items-start">
        <div className="justify-around items-center flex h-4/5 w-4/5 rounded-3xl bg-lime-300 shadow-[20px_20px_25px_-20px]">
          <CircleBar workouts = {workouts} widthSVG={200} heightSVG={200}  target={4} />
          <div className="w-2/6  h-full flex flex-col justify-center">
            <text className="font-bold text-black text-3xl">
              Ready For your next workout?
            </text>
            <div className="mt-5 bg-[#716FFF] w-3/5 rounded-3xl h-1/6 justify-center flex items-center cursor-pointer hover:bg-[#716fffd1]">
              <text className="font-bold text-white text-3xl"
              onClick={() => navigate(`/workoutPlan`)}
              >Workout</text>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-3/5 ">
        <div className="bg-lime-500 h-4/5 w-1/5 rounded-3xl flex  flex-col shadow-[20px_20px_25px_-20px]">
          <text className="h-3/5 font-bold text-white text-3xl mx-14 mt-14">
            Your favourite workout is {favWorkout}
          </text>

          <div className="flex items-center justify-end h-2/5 me-4">
            <FontAwesomeIcon  style={{
              width: "80.378px",  
              height: "43.649px",
              transform: "rotate(-41.5deg)",
              
            }} color="#fafafa" icon={faDumbbell} />
          </div>
        </div>
        <div className="shadow-[20px_20px_25px_-20px] bg-lime-400 ml-10 rounded-3xl w-3/5 h-4/5 flex justify-center items-center">
          <BarChart barData = {barData} widthSVG={(innerWidth * 3) / 5 - 150} heightSVG={350} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
