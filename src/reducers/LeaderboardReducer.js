export function LeaderboardReducer(state = null, action) {

    switch (action.type) {
        case 'LEADERBOARD':
            return action.payload;
        default:
            return state
    }
}

export function LeaderboardIsLoadingReducer(state = null, action) {

    switch (action.type) {
        case 'LEADERBOARD_IS_LOADING':
            return action.payload;
        default:
            return state
    }
}
