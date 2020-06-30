import React from 'react'
import Blog from "./Blog"

const Blogs = ({ user, blogs, setUser }) => {

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
            {blogs.map((blog) => {
                return <Blog key={blog.title} blog={blog} user={user}/>

            })}
        </div>
    )
}

export default Blogs