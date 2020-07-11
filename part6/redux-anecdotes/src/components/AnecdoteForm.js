import React from "react"
import { connect } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"
import { changeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {

    const newAnecdote = async (e) => {
        e.preventDefault()
        const text = e.target.newAnecdote.value
        e.target.newAnecdote.value = ""
        props.changeNotification(`You created "${text}"`, 5)
        props.createAnecdote(text)
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

const mapDispatchToProps = {
    changeNotification,
    createAnecdote
}

const AnecdoteFormConnect = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default AnecdoteFormConnect