const initialState = {
    msg: "Created Anecdote",
    hidden: true
}

const wait = async (time) => {
    return new Promise(resolve => {
        timeoutHandle = setTimeout(resolve, time * 1000)
        notifications.push(timeoutHandle)
    })
}
let timeoutHandle
let notifications = []

export const changeNotification = (msg, timeout) => {
    return async dispatch => {
        await dispatch({
            type: "NEW_MESSAGE",
            data: { msg }
        })

        const promise = wait(timeout)

        if (notifications.length > 1) {
            for(let i = 0; i < notifications.length - 1; i++){
                //console.log("Notification exists, deleting notification with id", notifications[i])
                clearTimeout(notifications[i])
                notifications.splice(i, 1)

            }
        }
        await promise
        await dispatch({
            type: "HIDE_NOTIFICATION"
        })
        notifications.pop()
    }
}


const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case "NEW_MESSAGE":
            return {...state, msg: action.data.msg, hidden: false}
        case "HIDE_NOTIFICATION":
            return {...state, hidden: true}
        default:
            return state
    }
}

export default notificationReducer