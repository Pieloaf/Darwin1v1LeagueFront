import axios from 'axios'
let API_END_POINT = "https://darwin1v1league.com:100"

export function actionGetPatchNotes(season) {
    var url = `${API_END_POINT}/patches/${season}`
    return function (dispatch) {
        dispatch({ type: "LOADING_PATCHES", payload: true })
        axios.get(url).then((response) => {
            if (response && response.data) {
                dispatch({ type: "PATCHES", payload: response.data })
            } else {
                dispatch({ type: "PATCHES", payload: null })
            }
            dispatch({ type: "LOADING_PATCHES", payload: false })
        }).catch(function (error) {
            if (error) {
                dispatch({ type: "PATCHES", payload: -1 })
            } else
                dispatch({ type: "PATCHES", payload: null })
            dispatch({ type: "LOADING_PATCHES", payload: false })
        })
    }
}

export default { actionGetPatchNotes }