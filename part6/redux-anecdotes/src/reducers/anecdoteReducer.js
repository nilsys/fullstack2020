export const voteAnecdote = (id) => {
    return {
        type: "VOTE_ANECDOTE",
        data: {id}
    }
}

export const addAllAnecdotes = (data) => {
    return {
        type: "ADD_ALL_ANECDOTES",
        data
    }
}

export const createAnecdote = (data) => {
    return {
        type: "NEW_ANECDOTE",
        data
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