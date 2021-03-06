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
import Blog from './components/Blog'
import Menu from './components/Menu'

const App = ({ initializeBlogs, user, setUser, initializeUsers }) => {
  const username = useField('adf')
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

  if (user === null) {
    return (
      <div className="container">
        <Error />
        <Login username={username} password={password} />
      </div>
    )
  }
  return (
    <div className="container">
      <Router>
        <div>
          <Menu />
          <h1>Blog App</h1>
          <Error />
          <Success />
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
          <Route
            path="/blogs/:id"
            render={({ match }) => <Blog id={match.params.id} user={user} />}
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
