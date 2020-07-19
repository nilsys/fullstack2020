import React from "react"
import Blog from "./Blog"
import CreateBlog from "./CreateBlog"

import { connect } from "react-redux"
import { deleteBlog, likeBlog } from "../reducers/blogReducer"
import { setUser } from "../reducers/userReducer"

const Blogs = (props) => {
    const logout = () => {
        window.localStorage.removeItem("loggedInUser")
        props.setUser(null)
    }

    const handleNewLike = async (blogObject) => {
        props.likeBlog(blogObject)
    }

    const handleBlogDelete = async (deleteBlog) => {
        const confirmation = `Remove blog ${deleteBlog.name} by ${deleteBlog.author}?`

        if (window.confirm(confirmation)) {
            props.deleteBlog(deleteBlog)
        }
    }

    return (
        <div>
            <h2>Blogs</h2>
            <div>
                {props.user.name} logged in
                <button onClick={() => logout()}>Logout</button>
            </div>
            <CreateBlog />
            <div>
                {props.blogs.sort((a, b) => {
                    return b.likes - a.likes
                }).map((blog) => {
                    return <Blog key={blog.id} blog={blog} user={props.user}
                        handleNewLike={handleNewLike} handleBlogDelete={handleBlogDelete} />
                
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user
    }
  }

const mapDispatchToProps = {
    deleteBlog,
    likeBlog,
    setUser
}

const ConnectedBlogs = connect(
    mapStateToProps,
    mapDispatchToProps
)(Blogs)

export default ConnectedBlogs