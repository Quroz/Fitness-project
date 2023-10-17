import React from "react";
import CompWorkouts from "../../interfaces/CompWorkouts"


type Props = {
  completedWorkouts: CompWorkouts[];
}
function LogAllWorkouts({ completedWorkouts }: Props) {

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {completedWorkouts.map((wo, index) => {
        return (
          <div key={wo.name} className="flex flex-col items-center justify-center w-3/5">
            <div className="gap-4 mt-1 md:gap-0 flex flex-col md:flex-row items-center justify-around w-full py-4 bg-white border-[1px] border-gray-300 rounded-md ">
              <h1>
                <strong>Day:</strong> {wo.workout.date}
              </h1>
              <h1>
                <strong>Name:</strong> {wo.name}
              </h1>
              <h1>
                <strong>Excercises:</strong> {wo.workout.workout.length}
              </h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LogAllWorkouts;
