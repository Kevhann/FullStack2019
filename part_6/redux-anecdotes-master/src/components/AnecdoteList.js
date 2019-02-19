import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationMessage } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes
  const filter = store.getState().filter

  const vote = anecdote => {
    console.log('filter', filter)
    console.log('vote', anecdote)
    store.dispatch(voteAnecdote(anecdote.id))
    store.dispatch(notificationMessage(anecdote.content))
    setTimeout(() => {
      // if (anecdote.content === store.getState().notifications)
      store.dispatch(notificationMessage(null))
    }, 5000)
  }

  return (
    <div>
      {anecdotes
        .filter(f => f.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((f, l) => l.votes - f.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}
export default AnecdoteList
