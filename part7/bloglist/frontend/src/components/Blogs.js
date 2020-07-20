import React from "react"
import CreateBlog from "./CreateBlog"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { setUser } from "../reducers/userReducer"
import "../index.css"

const Blogs = (props) => {

    return (
        <div>
            <CreateBlog />
            <div>
                {props.blogs.sort((a, b) => {
                    return b.likes - a.likes
                }).map((blog) => {
                    const url = `/blogs/${blog.id}`
                    return (
                        <Link to={url} key={blog.id}>
                            <div className={"blogStyle"}>
                                {blog.title}
                            </div>
                        </Link>
                    )
                
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
    setUser
}

const ConnectedBlogs = connect(
    mapStateToProps,
    mapDispatchToProps
)(Blogs)

export default ConnectedBlogs