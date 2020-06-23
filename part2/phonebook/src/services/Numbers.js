import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getNumbers = () => {
    const req = axios.get(baseUrl)
    return req.then(resp => resp.data)
}

const create = (newNumber) => {
    const req = axios.post(baseUrl, newNumber)
    return req.then(resp => resp.data)
}

// bubblegum
const deleteNumber = (id) => {
    const req =  axios.delete(`${baseUrl}/${id}`)
    return req.then(resp => resp.data)
}

const updateNumbers = (newNumber, id) => {
    const req = axios.put(`${baseUrl}/${id}`, newNumber)
    return req.then(resp => resp)
}

export default {getNumbers, create, deleteNumber, updateNumbers}