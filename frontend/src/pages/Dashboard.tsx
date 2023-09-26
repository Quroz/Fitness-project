import React from "react";
import CircleBar from "../components/CircleBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import BarChart from "../components/BarChart";



function Dashboard() {
  const innerWidth = window.innerWidth;
  return (
    <div className="flex h-full w-full justify-center flex-col">
      <div className="flex justify-center mt-6 h-2/5 items-start">
        <div className="justify-around items-center flex h-4/5 w-4/5 rounded-3xl bg-[#716FFF]">
          <CircleBar widthSVG={200} heightSVG={200} workouts={3} target={4} />
          <div className="w-2/6  h-full flex flex-col justify-center">
            <text className="font-bold text-[#FAFAFA] text-3xl">
              Ready For your next workout?
            </text>
            <div className="mt-5 bg-[#343434] w-3/5 rounded-3xl h-1/6 justify-center flex items-center cursor-pointer hover:bg-[#494949]">
              <text className="font-bold text-[#FAFAFA] text-3xl">Workout</text>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-3/5">
        <div className="bg-[#716FFF] h-4/5 w-1/5 rounded-3xl flex  flex-col">
        <text className="font-bold text-[#FAFAFA] text-3xl mx-14 mt-14">Your favourite workout is Back Day 2</text>
        
          <FontAwesomeIcon color="#fafafa" icon={faDumbbell} />
        </div>
        <div className="bg-[#716FFF] ml-10 rounded-3xl w-3/5 h-4/5 flex justify-center items-center">
          <BarChart widthSVG={innerWidth * 3/5-150} heightSVG={350}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
