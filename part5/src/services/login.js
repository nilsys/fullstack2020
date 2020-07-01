import axios from "axios"
const baseUrl = "/api/login"

const login = async (loginDetails) => {
    const resp = await axios.post(baseUrl, loginDetails)
    return resp.data
}

export default { login }