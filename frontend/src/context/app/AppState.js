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
const SET_DASHBOARD = "SET_DASHBOARD";
const UPDATE_SETTINGS = "UPDATE_SETTINGS";

function AppState(props) {
  const initialState = {
    user: [],
    workoutData: [],
    completedWorkouts: [],
    dashboardData: { favouriteWorkout: "", barData: [] },
    currentWorkout: undefined,
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);
  console.log(state)

  async function setUser() {
    let data = await APIController.fetchUser();
    dispatch({ type: SET_USER, payload: data.user });
  }
  async function setData() {
    let data = await APIController.fetchWorkouts();
    dispatch({ type: GET_DATA, payload: data });
    setCompleted(data);
    setUser();
  }
  async function setCompleted(data) {
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
    setDashboardData(filteredData);
  }
  async function setDashboardData(data) {
    if (data.length) {
      let mostCommon = [];

      for (let i = 0; i < data.length; i++) {
        let found = false;
        for (let j = 0; j < mostCommon.length; j++) {
          if (mostCommon[j].name === data[i].name) {
            mostCommon[j].value++;
            found = true;
            break;
          }
        }
        if (!found) {
          mostCommon.push({ name: data[i].name, value: 1 });
        }
      }

      let maxWorkout = mostCommon[0];

      for (let i = 1; i < mostCommon.length; i++) {
        if (mostCommon[i].value > maxWorkout.value) {
          maxWorkout = mostCommon[i];
        }
      }
      dispatch({
        type: SET_DASHBOARD,
        payload: {
          favouriteWorkout: "Your favourite workout is  " + maxWorkout.name,
          barData: mostCommon,
        },
      });
    } else {
      dispatch({
        type: SET_DASHBOARD,
        payload: {
          favouriteWorkout: "You have not performed a workout Yet",
          barData: [],
        },
      });
    }
  }
  async function setCurrentWorkout(workout) {
    dispatch({ type: SET_CURR_WORKOUT, payload: workout });
  }
  async function addWorkout(name, day) {
   let data =  await APIController.addToDatabase(name, day);
    if (data !== "Fail") {
      let newData = state.workoutData;
      newData.unshift(data);
      dispatch({
        type: ADD_WORKOUT,
        payload: newData,
      });
    }
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
    if (
      id &&
      selectedWorkoutName !== "" &&
      selectedBodyPart !== "" &&
      selectedEquipment !== ""
    ) {
      let newExercise = {
        name: selectedWorkoutName,
        bodyPart: selectedBodyPart,
        equipment: selectedEquipment,
        sets: numberOfSets,
        reps: numberOfReps,
      };
      let newData = state.currentWorkout;
      newData.exercises.unshift(newExercise);
      dispatch({
        type: ADD_EXCERCISE,
        payload: newExercise,
      });
    }
  }
  async function finishWorkout(id, workout) {
    await APIController.addFinishedWorkout(id, workout);
    let finishedWorkout = {
      name: state.currentWorkout.workoutName,
      workout: {
      plan_id: id,
      workout: workout,
      date:
        new Date().getDate() +
        "/" +
        new Date().getMonth() +
        "/" +
        new Date().getFullYear(),
      }
    };
    let cw = state.completedWorkouts;
    cw.unshift(finishedWorkout);
    dispatch({ type: FINISH_WORKOUT, payload: cw });
    console.log(cw);
  }
  async function removeWorkout(id) {
    await APIController.deleteWorkoutPlan(id);
    let data = state.workoutData.filter((wo) => wo.plan_id !== id);
    dispatch({ type: REMOVE_WORKOUT, payload: data });
  }
  function resetState() {
    dispatch({ type: RESET_STATE });
  }
  async function removeExercise(exId) {
    await APIController.deleteExercise(exId, state.currentWorkout.plan_id);

    let exercises = state.currentWorkout.exercises.splice(exId, 1);
    dispatch({ type: REMOVE_EXCERCISE, dispatch: exercises });
  }
  async function updateSettings(email, weight, height, age, goal) {
    let newUser = await APIController.updateSettings(
      email,
      weight,
      height,
      age,
      goal
    );
    dispatch({ type: UPDATE_SETTINGS, payload: newUser.updatedSettings });
  }
  return (
    <AppContext.Provider
      value={{
        user: state.user,
        workoutData: state.workoutData,
        completedWorkouts: state.completedWorkouts,
        dashboardData: state.dashboardData,
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
        removeExercise,
        setDashboardData,
        updateSettings,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
export default AppState;
