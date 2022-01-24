import axios from 'axios'
let API_END_POINT = "https://1v1api.pieloaf.com"

export function actionVerifyLogin(code) {
    var url = `${API_END_POINT}/login/${code}`
    return function (dispatch) {
        dispatch({ type: "LOGGING_IN", payload: true })
        axios.get(url, {
            withCredentials: true,
        }).then((response) => {
            if (response.data) {
                dispatch({ type: "LOGGED_IN", payload: response.data })
            } else {
                dispatch({ type: "LOGGED_IN", payload: null })
            }
            dispatch({ type: "LOGGING_IN", payload: false })
        }).catch(function (error) {
            if (error) {
                dispatch({ type: "LOGGED_IN", payload: -1 })
            } else {
                dispatch({ type: "LOGGED_IN", payload: null })
            }
            dispatch({ type: "LOGGING_IN", payload: false })
        })
    }
}