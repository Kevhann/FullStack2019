import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

const initial = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: '1'
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: '2'
  }
]
const Anecdote = ({ anecdote }) => (
  <div>
    <h3>{anecdote.content}</h3>
    <div>Author: {anecdote.author}</div>
    <div>Likes: {anecdote.votes}</div>
    <div>More info: {anecdote.info}</div>
  </div>
)

const Menu = () => (
  <>
    <Link style={{ padding: 5 }} to="/">
      anecdotes{' '}
    </Link>
    <Link style={{ padding: 5 }} to="/create">
      create new{' '}
    </Link>
    <Link style={{ padding: 5 }} to="/about">
      about{' '}
    </Link>
  </>
)

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <h2>Anecdotes</h2>
    <h3>{notification}</h3>
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <>
    Anecdote app for{' '}
    <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">
      Full Stack -sovelluskehitys
    </a>
    . See{' '}
    <a href="https://github.com/mluukkai/routed-anecdotes">
      https://github.com/mluukkai/routed-anecdotes
    </a>{' '}
    for the source code.
  </>
)

const CreateNew = props => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={e => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}
const Create = withRouter(CreateNew)

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initial)
  const [notification, setNotification] = useState('')

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`added anecdote ${anecdote.content}`)
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  const anecdoteById = id => anecdotes.find(a => a.id === id)

  const vote = id => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <div>
          <p>
            <Menu />
          </p>
          <Route
            exact
            path="/"
            render={() => (
              <AnecdoteList anecdotes={anecdotes} notification={notification} />
            )}
          />
          <Route
            path="/anecdotes/:id"
            render={({ match }) => (
              <Anecdote anecdote={anecdoteById(match.params.id)} />
            )}
          />
          <Route path="/about" render={() => <About />} />
          <Route path="/create" render={() => <Create addNew={addNew} />} />
          <p>
            <Footer />
          </p>
        </div>
      </Router>
    </div>
  )
}

export default App
