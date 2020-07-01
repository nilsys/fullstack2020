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

    return (
        <div>
            <h2>Blogs</h2>
            <div>
                {user.name} logged in
                <button onClick={() => logout()}>Logout</button>
            </div>
            <CreateBlog blogs={blogs} setBlogs={setBlogs}
                user={user} changeMessage={changeMessage}
                message={message} messageType={messageType} />
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