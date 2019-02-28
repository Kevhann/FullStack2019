import React, { useState } from 'react'
import Remove from './Remove'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, likeBlog, user }) => {
  const [showAll, setShowAll] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log('blog komponentti', blog)
  if (!showAll)
    return (
      <div style={blogStyle}>
        <div onClick={() => setShowAll(true)} className="condensedBlog">
          {blog.title}, by {blog.author}
        </div>
      </div>
    )

  return (
    <div style={blogStyle} className="expandedBlog">
      <div onClick={() => setShowAll(false)}>Title: {blog.title}</div>
      <div>Author: {blog.author}</div>
      <div>Webpage: {blog.url}</div>
      <div>
        {blog.likes} likes
        <button
          onClick={() => {
            console.log('liked blog', blog)
            likeBlog(blog)
          }}
        >
          like
        </button>
      </div>
      <div>Added by {blog.user ? blog.user.name : 'unknown'}</div>
      <Remove user={user} blog={blog} />
    </div>
  )
}
/*const mapStateToProps = state => ({
  user: state.user
})*/

export default connect(
  null,
  { likeBlog }
)(Blog)
