import React, {useState} from 'react'
import Notification from "./Notification"
import Togglable from "./Togglable"

import { connect } from "react-redux"
import { changeNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"


const CreateBlog = (props) => {
    const [ title, setTitle ] = useState("")
    const [ author, setAuthor ] = useState("")
    const [ url, setUrl ] = useState("")

    const handleNewBlog = (e) => {
        e.preventDefault()
        const blogObject = {
            "title": title,
            "author": author,
            "url": url
        }
        const resp = createNewBlog(blogObject)
        console.log(resp)
        if (resp) {
            setTitle("")
            setAuthor("")
            setUrl("")
        }
    }

    const createNewBlog = blogObject => {
        try {
            props.createBlog(props.user, blogObject)
            props.changeNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`, 3)
            return true
        } catch {
            props.changeNotification(`Invalid blog data`, 3)
            return false
        }
    }

    return (
        <div>
            <Notification/>
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
                        <button id="submitNewBlog" type="submit">Create</button>
                    </div>
                </form>

            </Togglable>

        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        notification: state.notification
    }
  }

const mapDispatchToProps = {
    createBlog,
    changeNotification
}

const ConnectedCreateBlog = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateBlog)
export default ConnectedCreateBlog