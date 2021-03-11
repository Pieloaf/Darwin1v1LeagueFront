import axios from 'axios'
let API_END_POINT = "https://api.darwin1v1league.com"

export function actionGetProfile(user_id, season) {
    var url = `${API_END_POINT}/user/${user_id}`
    if (season) {
        url = `${API_END_POINT}/user/${user_id}/${season}`
    }
    return function (dispatch) {
        dispatch({ type: "LOADING_PROFILE", payload: true })
        axios.get(url).then((response) => {
            if (response.data) {
                dispatch({ type: "PROFILE_LOADED", payload: response.data })
            } else {
                dispatch({ type: "PROFILE_LOADED", payload: null })
            }
            dispatch({ type: "LOADING_PROFILE", payload: false })
        }).catch(function (error) {
            if (error) {
                dispatch({ type: "PROFILE_LOADED", payload: -1 })
            } else {
                dispatch({ type: "PROFILE_LOADED", payload: null })
            }
            dispatch({ type: "LOADING_PROFILE", payload: false })
        })
    }
}

export function actionGetGames(user_id, season) {
    var url = `${API_END_POINT}/games/${user_id}`
    if (season) {
        url = `${API_END_POINT}/games/${user_id}/${season}`
    }
    return function (dispatch) {
        dispatch({ type: "LOADING_GAMES", payload: true })
        axios.get(url).then((response) => {
            if (response.data) {
                dispatch({ type: "GAMES_LOADED", payload: response.data })
            } else {
                dispatch({ type: "GAMES_LOADED", payload: null })
            }
            dispatch({ type: "LOADING_GAMES", payload: false })
        }).catch(function (error) {
            if (error) {
                dispatch({ type: "GAMES_LOADED", payload: -1 })
            } else {
                dispatch({ type: "GAMES_LOADED", payload: null })
            }
            dispatch({ type: "LOADING_GAMES", payload: false })
        })
    }
}

export default { actionGetProfile, actionGetGames }