import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationMessage } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, voteAnecdote, notificationMessage }) => {
  const vote = anecdote => {
    voteAnecdote(anecdote.id)
    notificationMessage(anecdote.content)
    setTimeout(() => {
      notificationMessage(null)
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
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
const anecdotesToShow = (anecdotes, filter) =>
  anecdotes
    .filter(f => f.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((f, l) => l.votes - f.votes)

const mapStateToProps = state => ({
  anecdotes: anecdotesToShow(state.anecdotes, state.filter)
})

const mapDispatchToProps = {
  voteAnecdote,
  notificationMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
