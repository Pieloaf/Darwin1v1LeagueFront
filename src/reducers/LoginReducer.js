export function LoggedInReducer(state = null, action) {

    switch (action.type) {
        case 'LOGGED_IN':
            return action.payload;
        default:
            return state
    }
}

export function LoggingInReducer(state = null, action) {

    switch (action.type) {
        case 'LOGGING_IN':
            return action.payload;
        default:
            return state
    }
}