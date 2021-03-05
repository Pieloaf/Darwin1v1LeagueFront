import { combineReducers } from 'redux'
import { LeaderboardReducer, LeaderboardIsLoadingReducer } from './LeaderboardReducer'
import { LoggedInReducer, LoggingInReducer } from './LoginReducer';
import { PatchesReducer, LoadingPatchesReducer } from './PatchNotesReducer'

const rootReducer = combineReducers({
    Leaderboard: LeaderboardReducer,
    LeaderboardIsLoading: LeaderboardIsLoadingReducer,
    LoggedIn: LoggedInReducer,
    LoggingIn: LoggingInReducer,
    Patches: PatchesReducer,
    LoadingPatches: LoadingPatchesReducer
})

export default rootReducer;