import React from "react"
import { connect } from "react-redux"
import { deleteBlog, likeBlog } from "../reducers/blogReducer"
import { Link } from "react-router-dom"
import Comments from "./Comments"
import "../index.css"


const Blog = (props) => {
    if (!props.blog) {
        return (
            <div>
                <h4>
                    404 Blog not found
                </h4>
                <Link to="/">Click here to get back to the frontpage</Link>
            </div>
        )
    }

    const blog = props.blog
    const user = props.user
    const showDelete = { display: user.username === blog.user.username ? " " : "none" }

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
            <h2>
                {blog.title}
            </h2>
                <div className={"url"}>
                    <a href={blog.url}>{blog.url}</a>
                </div>
                <div className={"likes"}>
                    {blog.likes}
                    <button type="button" onClick={() => handleNewLike(blog)}>Like</button>
                </div>
                <div style={showDelete}>
                    <button onClick={() => handleBlogDelete(blog)} type="button">Delete</button>
                </div>
                <div className={"Author"}>
                    Added by {blog.user.name}
                </div>
                <Comments blog={blog}/>
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
    likeBlog
}

const ConnectedBlog = connect(
    mapStateToProps,
    mapDispatchToProps
)(Blog)

export default ConnectedBlog
