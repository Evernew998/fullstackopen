import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = (newPersonObject) => {
    const request = axios.post(baseUrl, newPersonObject)
    return request.then(response => response.data)
}

const deletePerson = (id, name) => {
    console.log(id, name)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

export default ( {getPersons, createPerson, deletePerson} )