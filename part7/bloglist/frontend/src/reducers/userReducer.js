import blogService from "../services/blogs"

export const setUser = (user) => {
    return async dispatch => {
        if (user !== null){
            await blogService.setToken(user.token)
        }
        dispatch({
            type: "SET_USER",
            data: user
        })
    }
}

export const getUser = () => {
    return async dispatch => {
        dispatch({
            type: "GET_USER"
        })
    }
}

const reducer = (state = [], action) => {
    switch(action.type){
        case "SET_USER":
            return action.data

        case "GET_USER":
            return state

        default:
            return state
    }
}

export default reducer