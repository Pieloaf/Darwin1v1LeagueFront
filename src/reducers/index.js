import { combineReducers } from 'redux'
import { LeaderboardReducer, LeaderboardIsLoadingReducer } from './LeaderboardReducer'
import { LoggedInReducer, LoggingInReducer } from './LoginReducer';
import { ProfileLoadedReducer, LoadingProfileReducer } from './ProfileReducer'

const rootReducer = combineReducers({
    Leaderboard: LeaderboardReducer,
    LeaderboardIsLoading: LeaderboardIsLoadingReducer,
    LoggedIn: LoggedInReducer,
    LoggingIn: LoggingInReducer,
    ProfileLoaded: ProfileLoadedReducer,
    LoadingProfile: LoadingProfileReducer
})

export default rootReducer;