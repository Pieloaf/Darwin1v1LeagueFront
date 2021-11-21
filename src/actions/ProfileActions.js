import axios from 'axios'
let API_END_POINT = "https://1v1api.pieloaf.com"

export function actionGetProfile(user_id, season) {
    var url = `${API_END_POINT}/user`
    if (user_id) {
        url = `${url}?user_id=${user_id}`
    }
    return function (dispatch) {
        dispatch({ type: "LOADING_PROFILE", payload: true })
        axios.get(url, {
            withCredentials: true,
        }).then((response) => {
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
    var url = `${API_END_POINT}/games`
    if (user_id) {
        url = `${url}?user_id=${user_id}`
    }
    return function (dispatch) {
        dispatch({ type: "LOADING_GAMES", payload: true })
        axios.get(url, {
            withCredentials: true,
        }).then((response) => {
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