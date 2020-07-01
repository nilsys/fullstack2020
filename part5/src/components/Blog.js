import React, { useState } from 'react'
import "../index.css"

const Blog = ({blog}) => {
    const [ showBlog, setShowBlog] = useState(false)
    const [ buttonText, setButtonText ] = useState("view")

    const visibility = {display: showBlog ? " " : "none"}

    const handleShowBlog = () => {
        setShowBlog(!showBlog)
        setButtonText(buttonText === "view" ? "cancel" : "view")
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
                    <button>Like</button>
                </div>
                <div>
                    {blog.author}
                </div>
            </div>
        </div>
    )
}

export default Blog