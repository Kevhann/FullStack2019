import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const like = async blog => {
  blog.likes = blog.likes + 1
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  console.log('tykkäyksestä seurasi: ', response.data)
  return response.data
}
const remove = async blog => {
  console.log('postoon meni', blog)
  console.log('poistotoken: ', token)

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(token)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, token, setToken, create, like, remove }
