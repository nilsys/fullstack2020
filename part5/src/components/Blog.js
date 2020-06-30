import React from 'react'

const Blog = ({blog, user}) => {

    if (blog.user.username === user.username) {
        return (
        <div>
            {blog.title} {blog.author}
        </div>
        )
    } 
    return null
}

export default Blog