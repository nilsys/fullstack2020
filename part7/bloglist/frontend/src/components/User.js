import React from "react"
import { ListGroup } from "react-bootstrap"

const User = ({user}) => {
    if (!user){
        return null
    }
    return (
        <div>
            <div>
                <h1>Added blogs</h1>
            </div>
            <h3>
                {user.name}
            </h3>
            <ListGroup variant="flush">
                {user.blogs.map(blog => {
                    return <ListGroup.Item>{blog.title}</ListGroup.Item>
                })}
            </ListGroup>
        </div>
    )
}


export default User