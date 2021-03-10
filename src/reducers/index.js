import { combineReducers } from 'redux'
import { LeaderboardReducer, LeaderboardIsLoadingReducer } from './LeaderboardReducer'
import { LoggedInReducer, LoggingInReducer } from './LoginReducer';
import { ProfileLoadedReducer, LoadingProfileReducer } from './ProfileReducer'
import { PatchesReducer, LoadingPatchesReducer } from './PatchNotesReducer'
import { GamesLoadedReducer, LoadingGamesReducer } from './ProfileReducer'

const rootReducer = combineReducers({
    Leaderboard: LeaderboardReducer,
    LeaderboardIsLoading: LeaderboardIsLoadingReducer,
    LoggedIn: LoggedInReducer,
    LoggingIn: LoggingInReducer,
    ProfileLoaded: ProfileLoadedReducer,
    LoadingProfile: LoadingProfileReducer,
    Patches: PatchesReducer,
    LoadingPatches: LoadingPatchesReducer,
    GamesLoaded: GamesLoadedReducer,
    LoadingGames: LoadingGamesReducer
})

export default rootReducer;