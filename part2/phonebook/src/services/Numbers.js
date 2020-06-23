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
const deleteNumber = (numberToDelete) => {
    const req =  axios.delete(`${baseUrl}/${numberToDelete}`, getNumbers)
    return req.then(resp => resp.data)
}

export default {getNumbers, create, deleteNumber}