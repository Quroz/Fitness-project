export enum Types {
    setUserId = 'SET_USER_ID',
    setUserData = 'SET_USER_DATA',
    addWorkout = 'ADD_WORKOUT',
    deleteWorkout = "DELETE_WORKOUT",
    setCurrentWorkout = "SET_CURR_WORKOUT",
    
  }
export default (state,action) => {
    switch(action.type){
        case SET_GAME:
            return { ...state, gameMode: action.payload };
        case SET_GENRE:
            return { ...state, genre: action.payload };
        case GET_DATA:
            return { ...state, gameData: [ ...action.payload ]};
        case GET_CORRECT:
            return { ...state, corrAnswers: [ ...action.payload ]};
        case SET_SCORE:
            return { ...state, score: action.payload }
        case SET_TIME:
            return { ...state, time: action.payload }
        case SET_LYRICS:
            return { ...state, lyricsArray: [ ...action.payload ]};
        case SET_LEADERBOARD:
            return { ...state, leaderboardData: [ ...action.payload ]};
        case RESET_STATE:
			return {
				...state,
                gameMode: undefined,
                score: 0,
                gameData: [],
                corrAnswers: [],
                lyricsArray: [],
                genre: undefined,
                time: 0,
			};
        default:
            return state;
    }
}