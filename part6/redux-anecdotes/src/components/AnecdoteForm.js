import React from "react"

const AnecdoteForm = ({changeMessage}) => {

    const newAnecdote = (e) => {
        e.preventDefault()
        const text = e.target.newAnecdote.value
        e.target.newAnecdote.value = ""
        changeMessage(`You created "${text}"`)
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