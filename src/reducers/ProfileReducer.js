export function ProfileLoadedReducer(state = null, action) {

    switch (action.type) {
        case 'PROFILE_LOADED':
            return action.payload;
        default:
            return state
    }
}

export function LoadingProfileReducer(state = null, action) {

    switch (action.type) {
        case 'LOADING_PROFILE':
            return action.payload;
        default:
            return state
    }
}

export function GamesLoadedReducer(state = null, action) {

    switch (action.type) {
        case 'GAMES_LOADED':
            return action.payload;
        default:
            return state
    }
}

export function LoadingGamesReducer(state = null, action) {

    switch (action.type) {
        case 'LOADING_GAMES':
            return action.payload;
        default:
            return state
    }
}