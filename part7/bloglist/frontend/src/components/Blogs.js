import React from "react"
import CreateBlog from "./CreateBlog"
import { Table } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { setUser } from "../reducers/userReducer"
import "../index.css"

const Blogs = (props) => {

    return (
        <div>
            <CreateBlog />
            <div>
                <Table striped>
                    <tbody>

                    {props.blogs.sort((a, b) => {
                        return b.likes - a.likes
                    }).map((blog) => {
                        const url = `/blogs/${blog.id}`
                        return (
                            <tr key={blog.id}>
                                <td>
                                    <Link to={url}>
                                        <div>
                                            {blog.title}
                                        </div>
                                    </Link>
                                </td>
                                <td>
                                    {blog.user.name}
                                </td>
                            </tr>
                        )
                        
                    })}
                    </tbody>
                </Table>
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