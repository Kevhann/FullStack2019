import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Create from './components/Create'
import './styles.css'
import Messages from './components/Messages'

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

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logged', username, password)
    try {
      const user = await loginService.login({
        username,
        password
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
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
      <h2>blogs</h2>
      <h3>{user.name} logged in</h3>
      <button onClick={handleLogout}>Logout</button>
      <h3>Create new blog!</h3>

      <Messages.Error message={errorMessage} />
      <Messages.Success message={successMessage} />
      <Create
        blogs={blogs}
        setBlogs={setBlogs}
        errorNotification={errorNotification}
        successNotification={successNotification}
      />

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
