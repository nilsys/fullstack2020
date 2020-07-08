import anecdoteServer from "../services/anecdoteServer"

export const voteAnecdote = (object) => {
    return async dispatch => {
        dispatch({
            type: "VOTE_ANECDOTE",
            data: {
                id: object.id
            }
        })
        object.votes = object.votes + 1
        await anecdoteServer.upvote(object)
    }
}

export const addAllAnecdotes = () => {
    return async dispatch => {
        const anecs = await anecdoteServer.getAll()
        dispatch({
            type: "ADD_ALL_ANECDOTES",
            data: anecs
        })
    }
}

export const createAnecdote = (text) => {
    return async dispatch => {
        const anecdote = await anecdoteServer.addNew(text)
        dispatch({
            type: "NEW_ANECDOTE",
            data: anecdote
        })
    }
}

const reducer = (state = [], action) => {
    switch(action.type){
        case "VOTE_ANECDOTE":
            const id = action.data.id
            const anecdote = state.find(i => i.id === id)
            const votedAnec = {
                ...anecdote, votes: anecdote.votes + 1
            }
            return state.map(anec => anec.id !== id ? anec : votedAnec)

        case "NEW_ANECDOTE":
            return [...state, action.data]

        case "ADD_ALL_ANECDOTES":
            return action.data

        default:
            return state
    }
}

export default reducer