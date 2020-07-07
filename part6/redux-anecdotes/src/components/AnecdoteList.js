import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"


const AnecdoteList = ({changeMessage}) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter.msg)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        changeMessage(`You voted ${anecdote.content}`)
    }

    return (
        <div>
            {anecdotes.sort((a, b) => b.votes - a.votes)
            .filter(anecdote => anecdote.content.includes(filter))
            .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList