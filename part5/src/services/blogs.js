import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = "/api/login"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const login = async (loginDetails) => {
    const resp = await axios.post(loginUrl, loginDetails)
    return resp.data
}

export default { getAll, login }