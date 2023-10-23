import { React, useReducer } from "react";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import { APIController } from "../../models/apimodel";

const SET_USER = "SET_USER";
const SET_WORKOUTS = "SET_WORKOUTS";
const GET_DATA = "GET_DATA";
const SET_CURR_WORKOUT = "SET_CURR_WORKOUT";
const ADD_WORKOUT = "ADD_WORKOUT";
const ADD_EXCERCISE = "ADD_EXCERCISE";
const FINISH_WORKOUT = "FINISH_WORKOUT";
const REMOVE_WORKOUT = "REMOVE_WORKOUT";
const RESET_STATE = "RESET_STATE";
const REMOVE_EXCERCISE = "REMOVE_EXCERCISE";

function AppState(props) {
  const initialState = {
    user: [],
    workoutData: [],
    completedWorkouts: [],
    favouriteWorkout: undefined,
    currentWorkout: undefined,
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function setUser() {
    let data = await APIController.fetchUser();
    dispatch({ type: SET_USER, payload: data });
  }
  async function setData() {
    let data = await APIController.fetchWorkouts();
    dispatch({ type: GET_DATA, payload: data });
  }
  async function setCompleted() {
    let data = state.workoutData;
    let filteredData = [];
    for (let i = 0; i < data.length; i++) {
      data[i].completedWorkouts.forEach((workout) => {
        filteredData.push({
          name: data[i].workoutName,
          workout: workout,
        });
      });
    }
    dispatch({ type: SET_WORKOUTS, payload: filteredData });
  }
  async function setCurrentWorkout(workout) {
    dispatch({ type: SET_CURR_WORKOUT, payload: workout });
  }
  async function addWorkout(name, day) {
    await APIController.addToDatabase(name, day);
    dispatch({
      type: ADD_WORKOUT,
      payload: {
        workoutName: name,
        workoutDay: day,
        excercises: [""],
        plan_id: Date.now(),
      },
    });
  }
  async function addExercise(
    id,
    selectedWorkoutName,
    selectedBodyPart,
    selectedEquipment,
    numberOfSets,
    numberOfReps
  ) {
    await APIController.addExercise(
      id,
      selectedWorkoutName,
      selectedBodyPart,
      selectedEquipment,
      numberOfSets,
      numberOfReps
    );
    dispatch({
      type: ADD_EXCERCISE,
      payload: {
        name: selectedWorkoutName,
        bodyPart: selectedBodyPart,
        equipment: selectedEquipment,
        sets: numberOfSets,
        reps: numberOfReps,
      },
    });
  }
  async function finishWorkout(id, workout) {
    await APIController.addFinishedWorkout(id, workout);
    dispatch({
      type: FINISH_WORKOUT,
      payload: {
        plan_id: id,
        workout: workout,
        date:
          new Date().getDate() +
          "/" +
          new Date().getMonth() +
          "/" +
          new Date().getFullYear(),
      },
    });
  }
  async function removeWorkout(id){
    await APIController.deleteWorkoutPlan(id);
    let data = state.workoutData.filter(wo => wo.plan_id !== id);
    dispatch({type: REMOVE_WORKOUT, payload: data})
    
  }
  function resetState(){
    dispatch({type: RESET_STATE})
  }
  async function removeExercise(exId, workoutId){
    await APIController.deleteExercise(exId, workoutId);

    let exercises = state.currentWorkout.excercises.splice(exId, 1);
    dispatch({type: REMOVE_EXCERCISE, dispatch: exercises})
  }
  return (
    <AppContext.Provider
      value={{
        user: state.user,
        workoutData: state.workoutData,
        completedWorkouts: state.completedWorkouts,
        favouriteWorkout: state.favouriteWorkout,
        currentWorkout: state.currentWorkout,
        setUser,
        setData,
        setCompleted,
        setCurrentWorkout,
        addWorkout,
        addExercise,
        finishWorkout,
        removeWorkout,
        resetState,
        removeExercise

      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
export default AppState;
