import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Create from './components/Create'
import './styles.css'
import Togglable from './components/Togglable'
import { useField } from './hooks/index'
import Error from './components/Error'
import Success from './components/Success'
import { setError } from './reducers/errorReducer'

const App = ({ setError }) => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const startUser = JSON.parse(loggedUser)
      console.log('sivulta löyty', startUser)
      setUser(startUser)
      blogService.setToken(startUser.token)
    }
  }, [])

  const blogFormRef = React.createRef()

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logged', username.props.value)
    try {
      const loggedUser = await loginService.login({
        username: username.props.value,
        password: password.props.value
      })
      console.log('logattiin sisään', loggedUser)
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    } catch (exception) {
      console.log('bad login', setError)
      setError('Invalid login credentials', 10)
    }
    username.reset()
    password.reset()
  }
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const handleBlogLike = async blog => {
    await blogService.like(blog)
    setBlogs(blogs.map(b => (b !== blog ? b : blog)))
  }
  const handleDeletion = async blog => {
    if (window.confirm(`remove ${blog.title}?`)) {
      try {
        await blogService.remove(blog)
        setBlogs(blogs.filter(b => b !== blog))
      } catch (error) {
        console.log('error while deleting', error)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <Error />
        <Login
          username={username}
          password={password}
          handleLogin={handleLogin}
        />
      </div>
    )
  }
  return (
    <div>
      <h1>blogs</h1>
      <h3>{user.name} logged in</h3>
      <button onClick={handleLogout}>Logout</button>
      <Error />
      <Success />
      <Togglable
        showLabel={'add blog'}
        cancelLabel={'cancel'}
        ref={blogFormRef}
      >
        <Create
          blogs={blogs}
          setBlogs={setBlogs}
          setError={setError}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleBlogLike={handleBlogLike}
            user={user}
            handleDeletion={handleDeletion}
          />
        ))}
    </div>
  )
}

export default connect(
  null,
  { setError }
)(App)
