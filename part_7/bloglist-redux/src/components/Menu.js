import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
const Menu = ({ setUser }) => {
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }
  return (
    <div>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
export default connect(
  null,
  { setUser }
)(Menu)
