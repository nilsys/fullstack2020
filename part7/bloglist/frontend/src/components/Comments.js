import React, {useState} from "react"
import { useDispatch } from "react-redux"
import { addComment } from "../reducers/blogReducer"
import { Button, Form, ListGroup } from "react-bootstrap"

const Comments = ({blog}) => {
    const [comment, setComment] = useState("")
    const dispatch = useDispatch()

    const handleNewComment = async (e) => {
        e.preventDefault()
        dispatch(addComment(comment, blog.id))
        setComment("")
    }

    return (
        <div className={"pt-3"}>
            <h3>Comments</h3>
            <div>
                <Form onSubmit={handleNewComment}>
                    <Form.Control value={comment} onChange={({target}) => setComment(target.value)}/>
                    <Button className={"mt-2 mb-2"} type="submit">Add comment</Button>
                </Form>
            </div>
            <ListGroup>
                {blog.comments.map(comment => {
                    const key = Math.floor(Math.random() * 1000000000)
                    return <ListGroup.Item key={key}>{comment}</ListGroup.Item>
                })}
            </ListGroup>
        </div>
    )
}

export default Comments