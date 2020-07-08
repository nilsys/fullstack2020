const initialState = {
    msg: "Created Anecdote",
    hidden: true
}

const wait = async (time) => {
    return new Promise(resolve => {
        setTimeout(resolve, time * 1000)
    })
}

export const changeNotification = (msg, timeout) => {
    return async dispatch => {
        await dispatch({
            type: "NEW_MESSAGE",
            data: { msg }
        })
        await wait(timeout)
        await dispatch({
            type: "HIDE_NOTIFICATION"
        })
    }
}


const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case "GET_MESSAGE":
            return state
        case "NEW_MESSAGE":
            return {...state, msg: action.data.msg, hidden: false}
        case "HIDE_NOTIFICATION":
            return {...state, hidden: true}
        default:
            return state
    }
}

export default notificationReducer