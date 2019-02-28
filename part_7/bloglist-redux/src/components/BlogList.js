import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'

const BlogList = ({ blogs, user }) => {
  console.log('bloglist', blogs)
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  )
}
const mapStateToProps = state => ({
  blogs: state.blogs
})
export default connect(mapStateToProps)(BlogList)
