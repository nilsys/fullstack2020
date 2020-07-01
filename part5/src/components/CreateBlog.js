import React, {useState} from 'react'
import Notification from "./Notification"
import Togglable from "./Togglable"

const CreateBlog = ({message, messageType, createNewBlog}) => {
    const [ title, setTitle ] = useState("")
    const [ author, setAuthor ] = useState("")
    const [ url, setUrl ] = useState("")

    const handleNewBlog = async (e) => {
        e.preventDefault()
        const blogObject = {
            "title": title,
            "author": author,
            "url": url
        }
        const resp = await createNewBlog(blogObject)
        if (resp){
            setTitle("")
            setAuthor("")
            setUrl("")
        }
    }

    return (
        <div>
            <Notification message={message} type={messageType}/>
            <br/>
            <Togglable buttonLabel="New Blog">
            <h2>Create new Blog</h2>
                <form onSubmit={handleNewBlog}>
                    <div>
                        Title: <input id="title" value={title} onChange={({target}) => setTitle(target.value)}/>
                    </div>
                    <div>
                        Author: <input id="author" value={author} onChange={({target}) => setAuthor(target.value)}/>
                    </div>
                    <div>
                        URL: <input id="url" value={url} onChange={({target}) => setUrl(target.value)}/>
                    </div>
                    <div>
                        <button type="submit">Create</button>
                    </div>
                </form>

            </Togglable>

        </div>
    )

}

export default CreateBlog