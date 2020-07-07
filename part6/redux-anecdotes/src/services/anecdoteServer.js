import axios from "axios"

const host = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const resp = await axios.get(host)
    return resp.data
}

const addNew = async (anecdote) => {
    const object = {
        content: anecdote,
        votes: 0
    }
    const resp = await axios.post(host, object)
    return resp.data
}

export default { getAll, addNew }