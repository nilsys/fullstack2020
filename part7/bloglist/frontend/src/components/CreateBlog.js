import React, {useState} from 'react'
import Togglable from "./Togglable"

import { connect } from "react-redux"
import { changeNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"

import { Form, Button } from 'react-bootstrap'


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
            <Togglable buttonLabel="New Blog">
            <h2>Create new Blog</h2>
                <Form onSubmit={handleNewBlog}>
                    <Form.Group>
                        <Form.Label>
                            Title: 
                            <Form.Control id="title" value={title} onChange={({target}) => setTitle(target.value)}/>
                        </Form.Label>
                        <Form.Label>
                            Author: 
                            <Form.Control id="author" value={author} onChange={({target}) => setAuthor(target.value)}/>
                        </Form.Label>
                        <Form.Label>
                            URL: 
                            <Form.Control id="url" value={url} onChange={({target}) => setUrl(target.value)}/>
                        </Form.Label>
                        <div>
                            <Button id="submitNewBlog" type="submit">Create</Button>
                        </div>
                    </Form.Group>
                </Form>

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