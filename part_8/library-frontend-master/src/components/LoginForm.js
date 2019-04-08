import React, { useState } from 'react'

const LoginForm = ({ login, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async event => {
    event.preventDefault()

    try {
      const result = await login({
        variables: { username, password }
      })
      console.log('result:', result)
      const token = result.data.login.value
      const favourite = result.data.login.favouriteGenre
      console.log('favourite:', favourite)
      console.log('token:', token)
      setToken(token)
      localStorage.setItem('library-user-favourite', favourite)
      localStorage.setItem('library-user-token', token)
      setPage('authors')
    } catch (errorMessage) {
      console.log('error', errorMessage)
      setError('Invalid login credentials')
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  return (
    <div>
      <div style={{ color: 'red' }}>{error}</div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
