export function PatchesReducer(state = null, action) {

    switch (action.type) {
        case 'PATCHES':
            return action.payload;
        default:
            return state
    }
}

export function LoadingPatchesReducer(state = null, action) {

    switch (action.type) {
        case 'LOADING_PATCHES':
            return action.payload;
        default:
            return state
    }
}