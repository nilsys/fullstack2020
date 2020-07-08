import React from "react"
import { useDispatch } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"
import { changeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const newAnecdote = async (e) => {
        e.preventDefault()
        const text = e.target.newAnecdote.value
        e.target.newAnecdote.value = ""
        dispatch(changeNotification(`You created "${text}"`, 5))
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