import React from 'react'
import { connect } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'

const Remove = ({ user, blog, removeBlog }) => {
  console.log('poistava käyttäjä ', user)
  console.log('poistettava ', blog)
  if (!blog.user) {
    return <button onClick={() => removeBlog(blog)}>remove</button>
  }
  if (user.username !== blog.user.username) {
    console.log('not authorized to delete')
    return null
  }
  return <button onClick={() => removeBlog(blog)}>remove</button>
}

export default connect(
  null,
  { removeBlog }
)(Remove)
