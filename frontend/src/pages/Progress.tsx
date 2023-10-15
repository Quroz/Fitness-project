import React, { useState, Dispatch, SetStateAction } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

interface Workout {
  exercises: any[];
  completedSets: any[];
}

interface IProps {
  currentWorkout: Workout[];
  setCurrentWorkout: any;
  current:number
  addSet: (nrOfSets:number)=>void;
  addWeight: (weight:number, setNumber:number) => void;
  addReps: (reps:number, setNumber:number) => void;
  handleExcerciseChange: (id:number) => void;  
  loading: boolean
}
function Progress({ currentWorkout, addSet, addReps, addWeight, handleExcerciseChange, current, loading }: IProps) {
  
  console.log("currentWorkout", currentWorkout)
  
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-screen relative">
      <BsFillArrowLeftCircleFill className='absolute z-20 cursor-pointer left-2 top-2' size = {24} color = "black"
             onClick = {() => navigate(`/workoutPlan`)}
      />
      <div className="flex w-1/6 flex-col justify-center text-center">
        {loading ? 
          <ClipLoader
          color="#000000"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          /> 
      :

<>
{console.log("ex", currentWorkout[0])}
    {currentWorkout[0]?.exercises.map((ex, id) => {
      console.log("current", current)
      console.log("id", id)
        if (current === id) {
          return (
            <strong
              key={id}
              onClick={() => {
                handleExcerciseChange(id);
              }}
              className="mt-5"
            >
              {ex.name}
            </strong>
          );
        } else {
          return (
            <p
              key={id}
              onClick={() => {
                handleExcerciseChange(id);
              }}
              className="mt-5 bold text-gray-400 cursor-pointer"
            >
               {ex.name}
            </p>
          );
        }
      })}
      </>
      }
      </div>

      <div className="flex w-5/6 flex-col justify-around items-center">
        <div>
          <p className="w-full text-4xl">First Workout</p>
          {currentWorkout.length === 0 && !loading &&
          <div className="flex flex-col items-center mt-8 gap-2">
            <h1 className="text-2xl text-gray-500">There are no added workouts yet</h1>
              <button
								className="bg-gray-200 rounded-md py-2 w-[100px] text-sm hover:bg-lime-100"
                onClick = {() => navigate("/workoutPlan")}
                >
								 Add workouts
							</button>
           </div>
          }
        </div>
        <div className="h-1/4">
   
        </div>
        <div className="flex">
          <strong>
            Sets{" "}
            <input
              min={0}
              max={5}
              type="number"
              onChange={(evt) => {
                addSet(parseInt(evt.target.value));
              }}
              className="w-8"
              placeholder="0"
              value={currentWorkout[0]?.exercises.length ? currentWorkout[0]?.exercises[current].sets : 0}
            />
          </strong>
          <div className="ml-5"></div>
        </div>
        <div className="flex flex-col">
          {currentWorkout.length !== 0 ? (
            currentWorkout[current].completedSets.map(
              (thisSet: any, id: number) => {
                return (
                  <div key={"set" + id} className="flex">
                    <strong className="mr-8">Set{" " + (id + 1)}</strong>
                    <div className="ml-5">
                      Reps{" "}
                      <input
                        min={0}
                        max={30}
                        type="number"
                        className="w-12"
                        placeholder="0"
                        value={thisSet.reps}
                        onChange={(evt) => {
                          addReps(parseInt(evt.target.value), id);
                        }}
                      />
                    </div>
                    <div className="ml-5">
                      Weight{" "}
                      <input
                        min={0}
                        max={500}
                        type="number"
                        className="w-15"
                        placeholder="0"
                        value={thisSet.weight}
                        onChange={(evt) => {
                          addWeight(parseInt(evt.target.value), id);
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-center h-14 w-full">
          <button
            className="rounded-xl w-1/5 h-4/5 shadow"
            onClick={() => {
              handleExcerciseChange(current-1);
            }}
          >
            Previous
          </button>

          <button
            className="ml-5 rounded-xl h-4/5 shadow w-1/5"
            onClick={() => {
              handleExcerciseChange(current + 1);
            }}
          >
            Next
          </button>
          <button
            className="ml-5 bg-green-400 rounded-xl h-4/5 shadow w-1/5"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

export default Progress;
