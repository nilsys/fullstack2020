import React from 'react'
import Blog from "./Blog"
import CreateBlog from "./CreateBlog"

const Blogs = ({ user, setUser, blogs, setBlogs }) => {

    const logout = () => {
        window.localStorage.removeItem("loggedInUser")
        setUser(null)
    }

    return (
        <div>
            <h2>Blogs</h2>
            <div>
                {user.name} logged in
                <button onClick={() => logout()}>Logout</button>
            </div>
            <CreateBlog blogs={blogs} setBlogs={setBlogs} user={user}/>
            <div>
                {blogs.map((blog) => {
                    return <Blog key={blog.id} blog={blog} user={user}/>
                })}
            </div>
        </div>
    )
}

export default Blogs