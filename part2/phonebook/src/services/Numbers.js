import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getNumbers = () => {
    return axios.get(baseUrl)
}

const create = (newNumber) => {
    return axios.post(baseUrl, newNumber)
}

export default {getNumbers, create}