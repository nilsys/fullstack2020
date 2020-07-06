import React from "react"
import { useDispatch } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const newAnecdote = (e) => {
        e.preventDefault()
        const text = e.target.newAnecdote.value
        e.target.newAnecdote.value = ""
        dispatch(createAnecdote(text))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div>
                    <input name="newAnecdote" />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm