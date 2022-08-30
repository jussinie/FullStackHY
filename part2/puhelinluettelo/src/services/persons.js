import axios from 'axios'
const baseUrl = 'http://localhost:3009/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson)
}

export default { getAll, create, deletePerson, update }