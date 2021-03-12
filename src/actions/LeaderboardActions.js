import axios from 'axios'
let API_END_POINT = "https://darwin1v1league.com:100"

export function actionGetLeaderboard(p, r) {
    var url = `${API_END_POINT}/leaderboard/`
    if (r) {
        url = `${API_END_POINT}/leaderboard/${p}/${r}`
    }
    else if (p) {
        url = `${API_END_POINT}/leaderboard/${p}`
    }
    return function (dispatch) {
        dispatch({ type: "LEADERBOARD_IS_LOADING", payload: true })
        axios.get(url).then((response) => {
            if (response && response.data) {
                dispatch({ type: "LEADERBOARD", payload: response.data })
            } else {
                dispatch({ type: "LEADERBOARD", payload: null })
            }
            dispatch({ type: "LEADERBOARD_IS_LOADING", payload: false })
        }).catch(function (error) {
            if (error) {
                dispatch({ type: "LEADERBOARD", payload: -1 })
            } else
                dispatch({ type: "LEADERBOARD", payload: null })
            dispatch({ type: "LEADERBOARD_IS_LOADING", payload: false })
        })
    }
}