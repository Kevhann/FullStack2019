import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = ({ createAnecdote }) => {
  const create = event => {
    event.preventDefault()
    const content = event.target.create.value
    console.log('created anecdote', content)
    createAnecdote(content)
    event.target.create.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="create" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createAnecdote }
)(AnecdoteForm)
