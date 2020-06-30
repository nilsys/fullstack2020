import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = "/api/login"

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const login = async (loginDetails) => {
    const resp = await axios.post(loginUrl, loginDetails)
    return resp.data
}

const newBlog = async (blogObject) => {
    const config = {
        headers: { Authorization: token}
    }
    const resp = await axios.post(baseUrl, blogObject, config)
    return resp.data
}

export default { getAll, login, newBlog, setToken }