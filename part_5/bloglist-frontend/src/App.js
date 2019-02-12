import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Create from './components/Create'
import './styles.css'
import Messages from './components/Messages'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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
    console.log('logged', username, password)
    try {
      const loggedUser = await loginService.login({
        username,
        password
      })
      console.log('logattiin sisään', loggedUser)
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    } catch (exception) {
      errorNotification('Invalid login credentials')
    }
    setUsername('')
    setPassword('')
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
  const successNotification = message => {
    console.log('successNotification: ', message)
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const errorNotification = message => {
    console.log('errorNotification: ', message)
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Messages.Error message={errorMessage} />
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
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
      <Messages.Error message={errorMessage} />
      <Messages.Success message={successMessage} />
      <Togglable
        showLabel={'add blog'}
        cancelLabel={'cancel'}
        ref={blogFormRef}
      >
        <h3>Create new blog!</h3>

        <Create
          blogs={blogs}
          setBlogs={setBlogs}
          errorNotification={errorNotification}
          successNotification={successNotification}
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

export default App
