import React from "react"

const User = ({user}) => {
    if (!user){
        return null
    }
    return (
        <div>
            <h2>
                {user.name}
            </h2>
            <div>
                <h3>Added blogs</h3>
            </div>
            <ul>
                {user.blogs.map(blog => {
                    return <li>{blog.title}</li>
                })}
            </ul>
        </div>
    )
}


export default User