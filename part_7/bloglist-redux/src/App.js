import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import Login from './components/Login'
import Create from './components/Create'
import './styles.css'
import Togglable from './components/Togglable'
import { useField } from './hooks/index'
import Error from './components/Error'
import Success from './components/Success'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Users from './components/Users'
import { initializeUsers } from './reducers/allUsersReducer'
import IndividualUser from './components/IndividualUser'

const App = ({ initializeBlogs, user, setUser, initializeUsers }) => {
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    initializeBlogs()
    initializeUsers()
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
  console.log('luotu blogFormRef', blogFormRef)
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  if (user === null) {
    return (
      <div>
        <Error />
        <Login username={username} password={password} />
      </div>
    )
  }
  return (
    <div>
      <h1>blogs</h1>
      <h3>{user.name} logged in</h3>
      <Error />
      <Success />
      <button onClick={handleLogout}>Logout</button>

      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <Togglable
                  showLabel={'add blog'}
                  cancelLabel={'cancel'}
                  ref={blogFormRef}
                >
                  <Create blogFormRef={blogFormRef} />
                </Togglable>
                <BlogList user={user} />
              </>
            )}
          />
          <Route exact path="/users" render={() => <Users />} />
          <Route
            path="/users/:id"
            render={({ match }) => <IndividualUser id={match.params.id} />}
          />
        </div>
      </Router>
    </div>
  )
}
const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  { initializeBlogs, setUser, initializeUsers }
)(App)
