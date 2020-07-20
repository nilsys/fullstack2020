import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const resp = await axios.get(baseUrl)
    return resp.data
}

const newBlog = async (blogObject) => {
    const config = {
        headers: { Authorization: token }
    }
    const resp = await axios.post(baseUrl, blogObject, config)
    return resp.data
}

const updateLikes = async (blogObject) => {
    const resp = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
    return resp.data
}

const addNewComment = async (blogObject, id) => {
    const config = {
        headers: { Authorization: token }
    }
    const resp = await axios.post(`${baseUrl}/${id}/comments`, blogObject, config)
    return resp.data
}

const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    const resp = await axios.delete(`${baseUrl}/${id}`, config)
    return resp.data
}

export default { getAll, newBlog, setToken, updateLikes, deleteBlog, addNewComment }