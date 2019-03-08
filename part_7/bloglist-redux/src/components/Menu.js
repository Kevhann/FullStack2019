import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = ({ setUser, user }) => {
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }
  const padding = {
    padding: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>
        Blogs
      </Link>
      <Link to="/users" style={padding}>
        Users
      </Link>
      <em style={padding}>{user.name} logged in</em>

      <Button variant="primary" onClick={handleLogout} style={padding}>
        Logout
      </Button>
    </div>
  )
}
const mapStateToProps = state => ({
  user: state.user
})
export default connect(
  mapStateToProps,
  { setUser }
)(Menu)
