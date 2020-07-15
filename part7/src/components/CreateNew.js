import React, { useState } from "react"
import { useField } from "../hooks/index"
import { Redirect } from "react-router-dom"

const CreateNew = (props) => {
    const content = useField("text")
    const author = useField("text")
    const info = useField("text")

    const [ redirect, changeRedirect ] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        props.changeNotification(`A new Anecdote ${content.value} created!`)
        changeRedirect(true)
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
  }

    return (
        <div>
            {redirect ? <Redirect to="/"/> : null} 
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                    <div>
                    url for more info
                    <input {...info} />
                </div>
                <button>create</button>
            </form>
        </div>
        )
}

export default CreateNew