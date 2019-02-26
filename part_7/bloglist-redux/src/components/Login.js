import React from 'react'
const Login = ({ handleLogin, username, password }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input {...username.props} />
      </div>
      <div>
        Password
        <input {...password.props} />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
export default Login
