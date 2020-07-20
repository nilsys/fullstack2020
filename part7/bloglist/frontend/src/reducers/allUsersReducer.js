import userService from "../services/users"

export const getUsers = () => {
    return async dispatch => {
        dispatch({
            type: "GET_USER"
        })
    }
}

export const setAllUsers = () => {
    return async dispatch => {
        const data = await userService.getAllUsers()
        console.log(data)
        dispatch({
            type: "SET_ALL_USERS",
            data
        })
    }
}

const reducer = (state = [], action) => {
    switch(action.type){
        case "SET_ALL_USERS":
            return action.data

        case "GET_USER":
            return state

        default:
            return state
    }
}

export default reducer