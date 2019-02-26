import React from 'react'
const Login = ({ handleLogin, username, password }) => {
  return (
    <div>
      <h2>Login</h2>
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
    </div>
  )
}
export default Login
