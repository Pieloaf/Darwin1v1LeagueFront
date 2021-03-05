import axios from 'axios'
let API_END_POINT = "https://darwin1v1league.com:100"

export function actionGetProfile(user_id) {
    var url = `${API_END_POINT}/user/${user_id}`
    if (season) {
        url = `${API_END_POINT}/user/${user_id}/${season}`
    }
    return function (dispatch) {
        dispatch({ type: "LOADING_PROFILE", payload: true })
        axios.get(url).then((response) => {
            if (response.data) {
                console.log(response.data[0].user_name)
                dispatch({ type: "PROFILE_LOADED", payload: response.data[0] })
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
        dispatch({ type: "LOADING_PROFILE", payload: true })
        axios.get(url).then((response) => {
            if (response.data) {
                console.log(response)
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

export default { actionGetProfile, actionGetGames }