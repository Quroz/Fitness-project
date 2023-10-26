import React, { useEffect, useState, useMemo, useContext } from "react";
import Progress from "../pages/Progress";
import { useLocation } from "react-router-dom";
import Workout from "../interfaces/WorkoutInterface";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/app/AppContext";
import WorkoutDay from "../interfaces/WorkoutDay";

interface Context {
	currentWorkout: WorkoutDay
  finishWorkout: (id: number, workout: Workout[]) => void
	
  }
export const ProgressPresenter = () => {
  const [workout, setWorkout] = useState<Workout[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  
  const searchData = new URLSearchParams(location.search).get("data");
  const [click, setClick] = useState<boolean>(false)
  const dataJSON = useMemo(() => {
    return searchData ? JSON.parse(decodeURIComponent(searchData)) : null;
  }, [searchData]);
	const context = useContext(AppContext);
	const {
	  currentWorkout,
    finishWorkout
	} = context as Context;


  const navigate = useNavigate();
	useEffect(() => {

	}, [])
  useEffect(() => {
    if(!currentWorkout){
			navigate("/workoutPlan")
		}else{
    let copy: Workout[] = new Array(currentWorkout.exercises.length);

    for (let index = 0; index < currentWorkout.exercises.length; index++) {
      copy[index] = {
        name: currentWorkout.exercises[index].name,
        equipment: currentWorkout.exercises[index].equipment,
        bodyPart: currentWorkout.exercises[index].bodyPart,
        sets: currentWorkout.exercises[index].sets,
        reps: currentWorkout.exercises[index].reps,
        completedSets: [],
      };
      for (let i = 0; i < currentWorkout.exercises[index].sets; i++) {
        copy[index].completedSets.push({
          reps: currentWorkout.exercises[index].reps,
          weight: 0,
        });
      }
    }

    setWorkout(copy);
  }
  }, []);

  function addSet(nrOfSets: number) {
    setWorkout((prevList: Workout[]) => {
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
    setWorkout((prevList: Workout[]) => {
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
    setWorkout((prevList: Workout[]) => {
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

  function handleExcerciseChange(id: number) {
    if (id < 0) setCurrent(0);
    else if (id > currentWorkout.exercises.length - 1)
      setCurrent(currentWorkout.exercises.length - 1);
    else {
      setCurrent(id);
    }
  }
  function handleFinishWorkout(){
    finishWorkout(currentWorkout.plan_id, workout);
    navigate("/workoutPlan");
  }

  function navigateHandler(){
		navigate("/workoutPlan")
	}

  return (
    currentWorkout && 
    <Progress
      current={current}
      finishWorkout={handleFinishWorkout}
      addWeight={addWeight}
      addReps={addReps}
      addSet={addSet}
      handleExcerciseChange={handleExcerciseChange}
      currentWorkout={workout}
      setCurrentWorkout={setWorkout} 
      workoutName={currentWorkout.workoutName}
      navigateHandler={navigateHandler}
      setClick={setClick}
      click={click}
    />
  );
};
