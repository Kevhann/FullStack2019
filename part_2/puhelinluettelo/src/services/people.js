import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newObject =>
  axios.post(baseUrl, newObject).then(response => response.data)

const remove = id => axios.delete(`${baseUrl}/${id}`)

const update = person => {
  return axios
    .put(`${baseUrl}/${person.id}`, person)
    .then(response => response.data)
}

export default {
  getAll,
  create,
  remove,
  update
}
