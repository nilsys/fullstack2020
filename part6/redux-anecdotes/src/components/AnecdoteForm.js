import React from "react"
import { useDispatch } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"
import anecdoteServer from "../services/anecdoteServer"

const AnecdoteForm = ({changeMessage}) => {

    const dispatch = useDispatch()

    const newAnecdote = async (e) => {
        e.preventDefault()
        const text = e.target.newAnecdote.value
        e.target.newAnecdote.value = ""
        changeMessage(`You created "${text}"`)
        const anecdote = await anecdoteServer.addNew(text)
        dispatch(createAnecdote(anecdote))
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