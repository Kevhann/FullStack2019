import axios from 'axios'
const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const create = async content => {
  console.log('bäkkiin lähti', content)
  const response = await axios.post(url, { content, votes: 0 })
  console.log('bäkistä tuli', response)
  return response.data
}

const vote = async anecdote => {
  anecdote.votes = anecdote.votes + 1
  console.log('anecdote to vote', anecdote)
  const response = await axios.put(`${url}/${anecdote.id}`, anecdote)
  return response.data
}

export default { getAll, create, vote }
