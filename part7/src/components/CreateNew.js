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
    // ??? :D
    const handleReset = (e) => {
        e.preventDefault()
        content.onReset()
        author.onReset()
        info.onReset()
    }

    return (
        <div>
            {redirect ? <Redirect to="/"/> : null} 
            <h2>Create a new anecdote.</h2>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div>
                    Content
                    <input {...content} />
                </div>
                <div>
                    Author
                    <input {...author} />
                </div>
                    <div>
                    Url for more info
                    <input {...info} />
                </div>
                <input type="submit" value="Create"/>
                <input type="reset" value="Reset"/>
            </form>
        </div>
        )
}

export default CreateNew