import React, { useState, Dispatch, SetStateAction } from "react";
import data from "../assets/textOvn.json";

interface Workout {
  name: string;
  equipment: string;
  trained: string;
  sets: number;
  reps: number;
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
}
function Progress({ currentWorkout, addSet, addReps, addWeight, handleExcerciseChange, current }: IProps) {
  
  console.log(currentWorkout);
  return (
    <div className="flex w-full h-screen">
      <div className="flex w-1/6 flex-col justify-center text-center">
        {data.map((ex, id) => {
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
      </div>

      <div className="flex w-5/6 flex-col justify-around items-center">
        <div>
          <p className="w-full text-4xl">First Workout</p>
        </div>
        <div className="h-1/4">
          <img className="h-full" src={data[current].gifUrl} alt="Excercise" />
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
              value={currentWorkout.length ? currentWorkout[current].sets : 0}
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
