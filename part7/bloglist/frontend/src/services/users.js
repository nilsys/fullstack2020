import axios from "axios"
const baseUrl = "/api/users"

const getAllUsers = async () => {
    const resp = await axios.get(baseUrl)
    return resp.data
}

export default { getAllUsers }