import React from 'react'
import { connect } from 'react-redux'

const IndividualUser = ({ id, users }) => {
  console.log('id:', id)
  const user = users.find(u => u.id === id)
  if (user === undefined) return null
  console.log('user:', user)
  return (
    <div>
      <h2>{user.name}</h2>
      <div>Added blogs</div>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}
const mapStateToProps = state => ({ users: state.users })
export default connect(mapStateToProps)(IndividualUser)
