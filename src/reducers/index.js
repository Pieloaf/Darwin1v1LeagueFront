import { combineReducers } from 'redux'
import {LeaderboardReducer,LeaderboardIsLoadingReducer} from './LeaderboardReducer'

const rootReducer = combineReducers({
    Leaderboard: LeaderboardReducer,
    LeaderboardIsLoading: LeaderboardIsLoadingReducer
})

export default rootReducer;