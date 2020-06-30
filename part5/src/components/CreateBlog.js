import React, {useState} from 'react'
import blogService from "../services/blogs"

const CreateBlog = ({blogs, setBlogs, user}) => {
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
        let resp = await blogService.newBlog(blogObject)
        resp.user = {
            "id": resp.user,
            "username": user.username,
            "name": user.name
            }
        setBlogs(blogs.concat(resp))
        console.log(`Created a new blog with id ${resp.id}`)
    }

    return (
        <div>
            <h2>Create new Blog</h2>
            <form onSubmit={handleNewBlog}>
                <div>
                    Title: <input value={title} onChange={({target}) => setTitle(target.value)}/>
                </div>
                <div>
                    Author: <input value={author} onChange={({target}) => setAuthor(target.value)}/>
                </div>
                <div>
                    URL: <input value={url} onChange={({target}) => setUrl(target.value)}/>
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>

        </div>
    )

}

export default CreateBlog