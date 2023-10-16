import React from "react";
import CompWorkouts from "../../interfaces/CompWorkouts"


interface Iprops {
  completedWorkouts: CompWorkouts[];
}
function LogAllWorkouts({ completedWorkouts }: Iprops) {
  console.log(completedWorkouts);

  return (
    <div className="flex justify-center flex-col items-center w-full">
      {completedWorkouts.map((wo, index) => {
        return (
          <div key={wo.name} className="flex justify-center flex-col items-center w-3/5">
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
