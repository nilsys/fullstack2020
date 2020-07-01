import React, { useState } from "react"
import "../index.css"

const Blog = ({ blog, user, handleNewLike, handleBlogDelete }) => {
    const [ showBlog, setShowBlog] = useState(false)
    const [ buttonText, setButtonText ] = useState("view")

    const visibility = { display: showBlog ? " " : "none" }
    const showDelete = { display: user.username === blog.user.username ? " " : "none" }

    const handleShowBlog = () => {
        setShowBlog(!showBlog)
        setButtonText(buttonText === "view" ? "hide" : "view")
    }


    return (
        <div className={"blogStyle"}>
            <div>
                {blog.title} <button onClick={handleShowBlog}>{buttonText}</button>
            </div>
            <div style={visibility}>
                <div>
                    {blog.url}
                </div>
                <div>
                    {blog.likes}
                    <button type="button" onClick={() => handleNewLike(blog.id)}>Like</button>
                </div>
                <div>
                    {blog.author}
                </div>
                <div style={showDelete}>
                    <button onClick={() => handleBlogDelete(blog)} type="button">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Blog