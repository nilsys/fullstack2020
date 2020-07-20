import React, {useState} from "react"
import { useDispatch } from "react-redux"
import { addComment } from "../reducers/blogReducer"

const Comments = ({blog}) => {
    const [comment, setComment] = useState("")
    const dispatch = useDispatch()

    const handleNewComment = async (e) => {
        e.preventDefault()
        dispatch(addComment(comment, blog.id))
        setComment("")
    }

    return (
        <div>
            <h3>Comments</h3>
            <div>
                <form onSubmit={handleNewComment}>
                    <input value={comment} onChange={({target}) => setComment(target.value)}/>
                    <button type="submit">Add comment</button>
                </form>
            </div>
            <ul>
                {blog.comments.map(comment => {
                    const key = Math.floor(Math.random() * 1000000000)
                    return <li key={key}>{comment}</li>
                })}
            </ul>
        </div>
    )
}

export default Comments