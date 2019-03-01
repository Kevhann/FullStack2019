import React from 'react'
import Remove from './Remove'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const Blog = ({ id, likeBlog, user, blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blog = blogs.find(b => b.id === id)
  console.log('blog komponentti', blog)
  if (blog === undefined) return null

  return (
    <div style={blogStyle} className="expandedBlog">
      <div>Title: {blog.title}</div>
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
const mapStateToProps = state => ({ blogs: state.blogs })
export default connect(
  mapStateToProps,
  { likeBlog }
)(Blog)
