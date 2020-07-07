const initialState = {
    msg: ""
}

export const changeFilter = (msg) => {
    return {
        type: "NEW_FILTER",
        data: {
            msg
        }
    }
}

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case "NEW_FILTER":
            return {...state, msg: action.data.msg}
        default:
            return state
    }
}

export default filterReducer