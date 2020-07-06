const initialState = {
    msg: "Created Anecdote",
    hidden: true
}

export const changeNotification = (msg) => {
    return {
        type: "NEW_MESSAGE",
        data: {
            msg
        }
    }
}

export const showNotification = () => {
    return {
        type: "SHOW_NOTIFICATION"
    }
}

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case "GET_MESSAGE":
            return state
        case "NEW_MESSAGE":
            return {...state, msg: action.data.msg}
        case "SHOW_NOTIFICATION":
            return {...state, hidden: !state.hidden}
        default:
            return state
    }
}

export default notificationReducer