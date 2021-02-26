import { combineReducers } from 'redux'
import { LeaderboardReducer, LeaderboardIsLoadingReducer } from './LeaderboardReducer'
import { LoggedInReducer, LoggingInReducer } from './LoginReducer';

const rootReducer = combineReducers({
    Leaderboard: LeaderboardReducer,
    LeaderboardIsLoading: LeaderboardIsLoadingReducer,
    LoggedIn: LoggedInReducer,
    LoggingIn: LoggingInReducer
})

export default rootReducer;