import React, { useEffect, useState } from 'react'
import Progress from './Progress'
import data from "../assets/textOvn.json"
interface Workout {
    name: string;
    equipment: string;
    trained: string;
    sets: number;
    reps: number;
    completedSets: any[];
  }
  
export const ProgressPresenter = () => {
    const [currentWorkout, setCurrentWorkout] = useState<Workout[]>([]);
    const [current, setCurrent] = useState<number>(0);
    useEffect(()=>{
        let copy: Workout[] = new Array(data.length);
        for (let index = 0; index < data.length; index++) {
            copy[index] = 
            {
                name: data[index].name,
                equipment: data[index].equipment,
                trained: data[index].target + data[index].secondaryMuscles.map(ex =>{return(", " + ex)}).join(""),
                sets: 0,
                reps: 0,
                completedSets: []

            }
            
        }
        setCurrentWorkout(copy);
    },[])

    function addSet(nrOfSets: number) {
      setCurrentWorkout((prevList: Workout[]) => {
        return prevList.map((obj, id) =>
          id === current
            ? {
                ...obj,
                sets: nrOfSets,
                completedSets:
                  obj.completedSets.length < nrOfSets
                    ? [...obj.completedSets, { reps: 0, weight: 0 }]
                    : obj.completedSets.slice(0, -1),
              }
            : obj
        );
      });
    }
    function addReps(reps: number, setNumber: number) {
      setCurrentWorkout((prevList: Workout[]) => {
        return prevList.map((obj, id) =>
          id === current
            ? {
                ...obj,
                completedSets: obj.completedSets.map((set, idx) =>
                  idx === setNumber ? { ...set, reps: reps } : set
                ),
              }
            : obj
        );
      });
    }
    function addWeight(weight: number, setNumber: number) {
      setCurrentWorkout((prevList: Workout[]) => {
        return prevList.map((obj, id) =>
          id === current
            ? {
                ...obj,
                completedSets: obj.completedSets.map((set, idx) =>
                  idx === setNumber ? { ...set, weight: weight } : set
                ),
              }
            : obj
        );
      });
    }
    function handleExcerciseChange(id:number){
      if(id < 0) setCurrent(0);
      else if( id > currentWorkout.length-1) setCurrent(currentWorkout.length-1);
      else{
        setCurrent(id);
      }
      
      
    }

  return (
    <Progress current={current} addWeight={addWeight} addReps={addReps} addSet={addSet} handleExcerciseChange={handleExcerciseChange} currentWorkout = {currentWorkout} setCurrentWorkout = {setCurrentWorkout}/>
  )
}
