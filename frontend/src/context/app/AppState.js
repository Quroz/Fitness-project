import { React, useReducer } from "react";
import gameContext from "./gameContext";
import gameReducer from "./gameReducer";
import { APIController } from "../models/apimodel.tsx";

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

function GameState(props) {
  const initialState = {
    user: [],
    workoutData: [],
    completedWorkouts: [],
    favouriteWorkout: undefined,
    currentWorkout: undefined,

  };
  const [state, dispatch] = useReducer(gameReducer, initialState);

  

  return (
    <gameContext.Provider
      value={{
        user: state.user,
        workoutData: state.workoutData,
        completedWorkouts: state.completedWorkouts,
        favouriteWorkout: state.favouriteWorkout,
        currentWorkout: state.currentWorkout,
      }}
    >
      {props.children}
    </gameContext.Provider>
  );
}
export default GameState;
