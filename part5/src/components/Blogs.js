import React from "react"
import Blog from "./Blog"
import CreateBlog from "./CreateBlog"
import blogService from "../services/blogs"

const Blogs = ({ user, setUser, blogs, setBlogs, changeMessage, message, messageType }) => {

    const logout = () => {
        window.localStorage.removeItem("loggedInUser")
        setUser(null)
    }

    const handleNewLike = async (id) => {
        let blogObject = null
        setBlogs(blogs.map(blog => {
            if (blog.id === id) {
                blog.likes = blog.likes + 1
                blogObject = blog
            }
            return blog
        }))
        await blogService.updateLikes(blogObject)
    }

    const handleBlogDelete = async (deleteBlog) => {
        const confirmation = `Remove blog ${deleteBlog.name} by ${deleteBlog.author}?`

        if (window.confirm(confirmation)) {
            setBlogs(blogs.filter(blog => blog.id !== deleteBlog.id))
            await blogService.deleteBlog(deleteBlog.id)
            console.log(`Deleted blog ${deleteBlog.id}`)
        }
    }

    const createNewBlog = async blogObject => {
        try {
            let resp = await blogService.newBlog(blogObject)
            resp.user = {
                "id": resp.user,
                "username": user.username,
                "name": user.name
                }
            setBlogs(blogs.concat(resp))
            changeMessage(`A new blog ${resp.title} by ${resp.author} added`, "success")
            console.log(`Created a new blog with id ${resp.id}`)
            return true
        } catch {
            changeMessage(`Invalid blog data`, "error")
            return false
        }
    }

    return (
        <div>
            <h2>Blogs</h2>
            <div>
                {user.name} logged in
                <button onClick={() => logout()}>Logout</button>
            </div>
            <CreateBlog createNewBlog={createNewBlog} message={message} messageType={messageType} />
            <div>
                {blogs.sort((a, b) => {
                    return b.likes - a.likes
                }).map((blog) => {
                    return <Blog key={blog.id} blog={blog} user={user}
                        handleNewLike={handleNewLike} handleBlogDelete={handleBlogDelete} />
                })}
            </div>
        </div>
    )
}

export default Blogs