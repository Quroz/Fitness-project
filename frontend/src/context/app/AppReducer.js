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
const SET_FAVOURITE = "SET_FAVOURITE"

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state,action) => {
    switch(action.type){
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_WORKOUTS:
            return { ...state, completedWorkouts: action.payload };
        case GET_DATA:
            return { ...state, workoutData: action.payload};
        case ADD_EXCERCISE:
            return { ...state, currentWorkout: {...state.currentWorkout , excercises: action.payload}};
        case SET_CURR_WORKOUT:
            return { ...state, currentWorkout: action.payload};
        case ADD_WORKOUT:
            return { ...state, workoutData: [ ...action.payload ] }
        case FINISH_WORKOUT:
            return { ...state, completedWorkouts: [ ...action.payload ]}
        case REMOVE_WORKOUT:
            return { ...state, workoutData: action.payload };
        case REMOVE_EXCERCISE:
            return { ...state, currentWorkout: {...state.currentWorkout , excercises: action.payload}};
        case SET_FAVOURITE:
            return { ...state, favouriteWorkout: action.payload };
        case RESET_STATE:
			return {
				...state,
                user: [],
                workoutData: [],
                completedWorkouts: [],
                favouriteWorkout: undefined,
                currentWorkout: undefined,
			};
        default:
            return state;
    }
}