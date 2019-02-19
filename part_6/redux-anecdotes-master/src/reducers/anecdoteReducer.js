import anecdoteService from '../services/anecdotes'

export const createAnecdote = anecdote => {
  return async dispatch => {
    const content = await anecdoteService.create(anecdote)
    console.log('asyncdispatch returned', content)
    dispatch({ type: 'CREATE', content })
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    await anecdoteService.vote(anecdote)
    dispatch({ type: 'VOTE', id: anecdote.id })
  }
}

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INITIALIZE', anecdotes })
  }
}

const AnecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      return state.map(s => (s.id === action.id ? { ...s, votes: s.votes } : s))
    case 'CREATE':
      console.log('CREATE sisällä', action.content)
      return state.concat(action.content)
    case 'INITIALIZE':
      console.log(action.anecdotes)
      return action.anecdotes
    default:
      return state
  }
}

export default AnecdoteReducer
