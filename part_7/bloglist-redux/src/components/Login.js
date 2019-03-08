import React from 'react'
import { loginUser } from '../reducers/userReducer'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

const Login = ({ username, password, loginUser }) => {
  const handleLogin = async event => {
    event.preventDefault()
    console.log('logged', username.props.value)
    loginUser(username.props.value, password.props.value)

    username.reset()
    password.reset()
  }
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
        <Button variant="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}
export default connect(
  null,
  { loginUser }
)(Login)
