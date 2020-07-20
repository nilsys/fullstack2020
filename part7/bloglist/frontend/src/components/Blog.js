import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Table } from "react-bootstrap"
import { deleteBlog, likeBlog } from "../reducers/blogReducer"
import Comments from "./Comments"


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
        <div className={"mt-3 pt-1"}>
            <h2>
                {blog.title}
            </h2>
                <div className={"url"}>
                    <a href={blog.url}>{blog.url}</a>
                </div>
                <div className={"font-weight-bold"}>
                    {blog.likes}
                    <Button size="sm" type="button" onClick={() => handleNewLike(blog)}>Like</Button>
                </div>
                <div className={"Author"}>
                    Added by {blog.user.name}
                </div>
                <div className={"mt-2"} style={showDelete}>
                    <Button size="sm" onClick={() => handleBlogDelete(blog)} type="button">Delete blog</Button>
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
