import blogService from "../services/blogs"


export const createBlog = (user, blogObject) => {
    return async dispatch => {
        try { 
            const resp = await blogService.newBlog(blogObject)
            const data = {
                    ...resp,
                    user: {
                        "id": resp.user,
                        "username": user.username,
                        "name": user.name
                    }
                }
                dispatch({
                    type: "NEW_BLOG",
                    data: data
                })
        } catch(err){
            console.log(err)
        }
    }
}

export const deleteBlog = (deleteBlog) => {
    return async dispatch => {
        await blogService.deleteBlog(deleteBlog.id)
        dispatch({
            type: "DELETE_BLOG",
            data: deleteBlog
        })
    }
}

export const createAllBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: "ADD_ALL_BLOGS",
            data: blogs
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        let blogObject = {...blog, likes: blog.likes + 1}
        await blogService.updateLikes(blogObject)
        dispatch({
            type: "VOTE_BLOG",
            data: blogObject
        })
    }
}

const reducer = (state = [], action) => {
    switch(action.type){
        case "VOTE_BLOG":
            const newBlog = action.data
            return state.map(blog => blog.id !== newBlog.id ? blog : newBlog)

        case "NEW_BLOG":
            return [...state, action.data]

        case "ADD_ALL_BLOGS":
            return action.data

        case "DELETE_BLOG":
            return state.filter(blog => blog.id !== action.data.id)

        default:
            return state
    }
}

export default reducer